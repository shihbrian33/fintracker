# Generated by Django 3.0.2 on 2020-01-25 23:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('transaction', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='author',
            field=models.ForeignKey(default=4, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]