from rest_framework import serializers
from creditcard.models import CreditCard


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCard
        fields = '__all__'
