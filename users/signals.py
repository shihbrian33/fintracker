from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import Profile
from transaction.models import Category


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()


@receiver(post_save, sender=User)
def create_default_categories(instance, created, raw, **kwargs):
    if created and not raw:
        Category.objects.create(type=1, name="Salary", author=instance)
        Category.objects.create(type=1, name="Cashback", author=instance)
        Category.objects.create(type=2, name="Cellphone Plan", author=instance)
        Category.objects.create(type=2, name="Car Payment", author=instance)
        Category.objects.create(type=2, name="Rent", author=instance)
        Category.objects.create(type=3, name="Dining", author=instance)
        Category.objects.create(type=3, name="Grocery", author=instance)
        Category.objects.create(type=3, name="Gas", author=instance)
