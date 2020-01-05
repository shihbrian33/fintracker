from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User
from django.utils import timezone

class CreditCard(models.Model):
    name = models.CharField(max_length=100)
    type = models.IntegerField(validators=[MinValueValidator(0),MaxValueValidator(3)])
    limit = models.IntegerField(validators=[MinValueValidator(1)])
    date_posted = models.DateTimeField(default=timezone.now)
    date_activated = models.DateField(blank=True, null=True)
    date_cancelled = models.DateField(blank=True, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    active = models.BooleanField(default=True)
    incentive = models.TextField()
    notes = models.TextField()
    
    def __str__(self):
        return self.name
