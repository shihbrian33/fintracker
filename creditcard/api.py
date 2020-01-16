from creditcard.models import CreditCard
from rest_framework import viewsets, permissions
from .serializers import CardSerializer


class CardViewSet(viewsets.ModelViewSet):

    def get_queryset(self):
        return CreditCard.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    serializer_class = CardSerializer
