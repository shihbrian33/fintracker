
from .api import CardViewSet
from rest_framework import routers
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

urlpatterns = [
    path('card', CardListView.as_view(), name='cc-home'),
    path('card/<int:pk>/', CardDetailView.as_view(), name='cc-detail'),
    path('card/new/', CardCreateView.as_view(), name='cc-create'),
    path('card/<int:pk>/update/', CardUpdateView.as_view(), name='cc-update'),
    path('card/<int:pk>/delete/', CardDeleteView.as_view(), name='cc-delete'),
    path('card/<int:pk>/cancel/', CardCancelView.as_view(), name='cc-cancel'),
    path('about/', views.about, name='cc-about'),
]

router = routers.DefaultRouter()
router.register('api/cards', CardViewSet, 'cards')

urlpatterns += router.urls
