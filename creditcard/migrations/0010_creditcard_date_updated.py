# Generated by Django 3.0.2 on 2020-01-11 10:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('creditcard', '0009_creditcard_date_reminder'),
    ]

    operations = [
        migrations.AddField(
            model_name='creditcard',
            name='date_updated',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
