from django.shortcuts import render
from django.http import HttpResponse
from .models import CreditCard
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.forms import widgets
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib.auth.models import User
import datetime

name_map = {'annualfee': 'Annual Fee'}

class CardListView(LoginRequiredMixin, ListView):
    model = CreditCard
    context_object_name = 'ActiveCC'

    def get_queryset(self):
        user = self.request.user
        return CreditCard.objects.filter(author=user,active=1).order_by('type')
    
    def get_context_data(self, *args, **kwargs):
        user = self.request.user
        context = super(CardListView, self).get_context_data(*args, **kwargs)
        context['InactiveCC'] = CreditCard.objects.filter(author=user,active=0).order_by('type')
        return context


class CardDetailView(LoginRequiredMixin, UserPassesTestMixin, DetailView):
    model = CreditCard

    def test_func(self):
        card = self.get_object()
        if self.request.user == card.author:
            return True
        return False

class CardCreateView(LoginRequiredMixin, CreateView):
    model = CreditCard
    fields = ['name', 'type', 'limit', 'date_activated', 'date_cancelled', 'active', 'incentive', 'notes', 'annualfee', 'date_reminder']

    def form_valid(self, form):
        form.instance.author = self.request.user
        form.instance.active = form.instance.date_cancelled is None
        return super().form_valid(form)


class CardUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = CreditCard
    fields = ['name', 'type', 'limit', 'date_activated', 'date_cancelled', 'active', 'incentive', 'notes', 'annualfee', 'date_reminder']
    context_object_name = 'context'

    def form_valid(self, form):
        form.instance.author = self.request.user
        form.instance.active = form.instance.date_cancelled is None
        return super().form_valid(form)

    def test_func(self):
        card = self.get_object()
        if self.request.user == card.author:
            return True
        return False

    def get_context_data(self, *args, **kwargs):
        context = super(CardUpdateView, self).get_context_data(*args, **kwargs)
        context['name_mapping'] = name_map
        return context

class CardCancelView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = CreditCard
    fields = ['active']

    def form_valid(self, form):
        form.instance.date_cancelled = datetime.date.today()
        form.instance.active = 0
        return super().form_valid(form)

    def test_func(self):
        card = self.get_object()
        if self.request.user == card.author:
            return True
        return False

class CardDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = CreditCard
    success_url = '/'
    
    def test_func(self):
        card = self.get_object()
        if self.request.user == card.author:
            return True
        return False

def about(request):
    return render(request, 'creditcard/about.html')
