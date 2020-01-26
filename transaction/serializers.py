from rest_framework import serializers
from transaction.models import Transaction, Category


class TransactionGetSerializer(serializers.ModelSerializer):
    cat_name = serializers.SerializerMethodField()
    cat_type = serializers.SerializerMethodField()

    class Meta:
        model = Transaction
        fields = ['id', 'amount', 'date_posted',
                  'date_updated', 'date', 'notes', 'category', 'cat_name', 'cat_type']

    def get_cat_name(self, obj):
        return str(obj.category)

    def get_cat_type(self, obj):
        cat = Category.objects.get(id=obj.category_id)
        return cat.type


class TransactionPostSerializer(serializers.ModelSerializer):
    cat_name = serializers.SerializerMethodField()
    cat_type = serializers.SerializerMethodField()

    class Meta:
        model = Transaction
        fields = ['id', 'amount', 'date_posted',
                  'date_updated', 'date', 'notes', 'category', 'cat_name', 'cat_type']

    def get_cat_name(self, obj):
        return str(obj.category)

    def get_cat_type(self, obj):
        cat = Category.objects.get(id=obj.category_id)
        return cat.type


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
