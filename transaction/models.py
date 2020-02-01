from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from model_utils import Choices
from django.core.validators import MinValueValidator


class Category(models.Model):
    TYPES = Choices(
        (1, 'Income'),
        (2, 'Recurring'),
        (3, 'Expense')
    )
    type = models.PositiveSmallIntegerField(
        choices=TYPES,
        default=1,
    )
    name = models.CharField(max_length=50)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Transaction(models.Model):
    amount = models.IntegerField(validators=[MinValueValidator(0)])
    date_posted = models.DateTimeField(default=timezone.now)
    date_updated = models.DateTimeField(auto_now=True)
    date = models.DateField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    notes = models.TextField(blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    merchant = models.CharField(max_length=50, blank=True, null=True)
    card = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return str(self.category)
