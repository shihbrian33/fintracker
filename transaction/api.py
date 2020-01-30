from transaction.models import Transaction, Category
from rest_framework import viewsets, permissions, status
from .serializers import TransactionGetSerializer, TransactionPostSerializer, CategorySerializer
from rest_framework.response import Response


class TransactionViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        if self.action == 'list':
            month = self.request.query_params.get('month')
            year = self.request.query_params.get('year')
            cattype = self.request.query_params.get('type')
            filter_kwargs = {'author': self.request.user}
            if month:
                filter_kwargs['date__month'] = month
            if year:
                filter_kwargs['date__year'] = year
            if cattype:
                filter_kwargs['category__type'] = cattype
            return Transaction.objects.filter(**filter_kwargs)
        else:
            return Transaction.objects.filter(author=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data, many=isinstance(request.data, list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_serializer_class(self):
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
