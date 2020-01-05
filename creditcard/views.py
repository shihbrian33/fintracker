from django.shortcuts import render
from django.http import HttpResponse
from .models import CreditCard

posts = [
    {
        'author': 'BrianS',
        'name': 'Rogers World Elite',
        'type': 'Mastercard',
        'limit': 1000,
        'date_posted': 'January 5, 2020',
        'date_approved': 'January 1, 2020',
        'date_cancelled': '',
        'active': 1,
        'incentive': '1.75% Cashback on everything',
        'notes': '4%% cashback on foreign purchases'
    },
    {
        'author': 'BrianS',
        'name': 'Scotiabank World Elite',
        'type': 'Mastercard',
        'limit': 5000,
        'date_posted': 'January 7, 2020',
        'date_approved': 'January 11, 2020',
        'date_cancelled': 'January 11, 2021',
        'active': 0,
        'incentive': '10% Cashback on first 2k',
        'notes': ''
    }    
]

def home(request):
    context = {
        'CreditCards': CreditCard.objects.all()
    }
    return render(request, 'creditcard/home.html', context)

def about(request):
    return render(request, 'creditcard/about.html')
