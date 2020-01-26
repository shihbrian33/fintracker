from rest_framework import serializers
from transaction.models import Transaction, Category


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['amount', 'date_posted',
                  'date_updated', 'date', 'notes', 'category']
        depth = 1


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
