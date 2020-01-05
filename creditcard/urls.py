from django.urls import path
from . import views
from .views import (
    CardListView, 
    CardDetailView, 
    CardCreateView,
    CardUpdateView,
    CardDeleteView
    )

urlpatterns = [
    path('', CardListView.as_view(), name='cc-home'),
    path('card/<uuid:pk>/', CardDetailView.as_view(), name='cc-detail'),
    path('card/new/', CardCreateView.as_view(), name='cc-create'),
    path('card/<uuid:pk>/update/', CardUpdateView.as_view(), name='cc-update'),
    path('card/<uuid:pk>/delete/', CardDeleteView.as_view(), name='cc-delete'),
    path('about/', views.about, name='cc-about'),
]
