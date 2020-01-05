from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='cc-home'),
    path('about/', views.about, name='cc-about'),
]
