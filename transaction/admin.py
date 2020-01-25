from django.contrib import admin
from transaction.models import Transaction
from transaction.models import Category

admin.site.register(Transaction)
admin.site.register(Category)
