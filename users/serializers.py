from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from .tokens import account_activation_token
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import EmailMessage
from django.utils.encoding import force_bytes, force_text
from django.contrib.sites.shortcuts import get_current_site


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def validate_email(self, email):
        user = User.objects.filter(email=email)
        if(user):
            raise serializers.ValidationError("Email already in use")
        return email

    def create(self, validated_data):
        request = self.context['request']
        curr_site = get_current_site(request)
        user = User.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'], is_active=False)
        subject = "Activate your account"
        message = render_to_string('users/account_activation.html', {
            'user': user,
            'domain': curr_site.domain,
            'uid': urlsafe_base64_encode(force_bytes(user.pk)),
            'token': account_activation_token.make_token(user),
        })
        print(message)
        to_email = validated_data['email']
        email = EmailMessage(subject, message, to=[to_email])
        email.send()
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Incorrect username/password')
