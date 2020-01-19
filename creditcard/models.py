from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User
from django.urls import reverse
from django.utils import timezone
from model_utils import Choices


class CreditCard(models.Model):
    name = models.CharField(max_length=50)
    TYPES = Choices(
        (1, 'Mastercard'),
        (2, 'Visa'),
        (3, 'American Express'),
        (4, 'Other'))
    type = models.PositiveSmallIntegerField(
        choices=TYPES,
        default=1,
    )
    limit = models.IntegerField(validators=[MinValueValidator(0)])
    date_posted = models.DateTimeField(default=timezone.now)
    date_updated = models.DateTimeField(auto_now=True)
    date_activated = models.DateField()
    date_cancelled = models.DateField(blank=True, null=True)
    date_reminder = models.DateField(blank=True, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    active = models.BooleanField(default=True)
    incentive = models.TextField(blank=True)
    notes = models.TextField(blank=True)
    annualfee = models.IntegerField(
        validators=[MinValueValidator(0)], default=0)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('cc-detail', kwargs={'pk': self.pk})
