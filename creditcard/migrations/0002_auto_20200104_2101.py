# Generated by Django 3.0.2 on 2020-01-04 21:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('creditcard', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='creditcard',
            name='date_activated',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='creditcard',
            name='date_cancelled',
            field=models.DateField(blank=True, null=True),
        ),
    ]
