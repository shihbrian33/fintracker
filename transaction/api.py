from transaction.models import Transaction, Category
from rest_framework import viewsets, permissions
from .serializers import TransactionGetSerializer, TransactionPostSerializer, CategorySerializer


class TransactionViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return Transaction.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_serializer_class(self):
        print(self.action)
        if self.action == 'list':
            return TransactionGetSerializer
        if self.action == 'create':
            return TransactionPostSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return Category.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    serializer_class = CategorySerializer
