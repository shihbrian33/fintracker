from creditcard.models import CreditCard
from rest_framework import viewsets, permissions
from .serializers import CardSerializer


class CardViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        if self.action == 'list':
            active = self.request.query_params.get('active')
            filter_kwargs = {'author': self.request.user}
            if active:
                filter_kwargs['active'] = active
            return CreditCard.objects.filter(**filter_kwargs)
        else:
            return CreditCard.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    serializer_class = CardSerializer
