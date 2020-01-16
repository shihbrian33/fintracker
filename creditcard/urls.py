from django.urls import path
from . import views
from .views import (
    CardListView,
    CardDetailView,
    CardCreateView,
    CardUpdateView,
    CardDeleteView,
    CardCancelView
)
from .api import CardViewSet
from rest_framework import routers

urlpatterns = [
    path('', CardListView.as_view(), name='cc-home'),
    path('card/<uuid:pk>/', CardDetailView.as_view(), name='cc-detail'),
    path('card/new/', CardCreateView.as_view(), name='cc-create'),
    path('card/<uuid:pk>/update/', CardUpdateView.as_view(), name='cc-update'),
    path('card/<uuid:pk>/delete/', CardDeleteView.as_view(), name='cc-delete'),
    path('card/<uuid:pk>/cancel/', CardCancelView.as_view(), name='cc-cancel'),
    path('about/', views.about, name='cc-about'),
]

router = routers.DefaultRouter()
router.register('api/cards', CardViewSet, 'cards')

urlpatterns += router.urls
