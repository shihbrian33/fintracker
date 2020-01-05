from django.shortcuts import render
from django.http import HttpResponse
from .models import CreditCard
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.forms import widgets
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin

class CardListView(ListView):
    model = CreditCard
    context_object_name = 'CreditCards'
    ordering = ['-active']

    def get_queryset(self):
        user = self.request.user
        return CreditCard.objects.filter(author=user)


class CardDetailView(LoginRequiredMixin, UserPassesTestMixin, DetailView):
    model = CreditCard

    def test_func(self):
        card = self.get_object()
        if self.request.user == card.author:
            return True
        return False

class CardCreateView(LoginRequiredMixin, CreateView):
    model = CreditCard
    fields = ['name', 'type', 'limit', 'date_activated', 'date_cancelled', 'active', 'incentive', 'notes']

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)

    def get_form(self):
        form = super().get_form()
        form.fields['date_activated'].widget = widgets.SelectDateWidget()
        form.fields['date_cancelled'].widget = widgets.SelectDateWidget()
        return form

class CardUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = CreditCard
    fields = ['name', 'type', 'limit', 'date_activated', 'date_cancelled', 'active', 'incentive', 'notes']

    def form_valid(self, form):
        form.instance.author = self.request.user
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
