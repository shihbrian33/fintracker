from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User
from django.urls import reverse
from django.utils import timezone
from model_utils import Choices
import uuid

class CreditCard(models.Model):
    id = models.UUIDField(primary_key= True, default = uuid.uuid4, editable = False)
    name = models.CharField(max_length=100)
    TYPES = Choices(
        (1, 'Mastercard'),
        (2, 'Visa'),
        (3, 'American Express'),
        (4, 'Other'))
    type = models.PositiveSmallIntegerField(
        choices=TYPES,
        default=1,
    )
    limit = models.IntegerField(validators=[MinValueValidator(1)])
    date_posted = models.DateTimeField(default=timezone.now)
    date_activated = models.DateField(blank=True, null=True)
    date_cancelled = models.DateField(blank=True, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    active = models.BooleanField(default=True)
    incentive = models.TextField(blank=True)
    notes = models.TextField(blank=True)
    
    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('cc-detail', kwargs={'pk':self.pk})