# Generated by Django 3.0.2 on 2020-01-05 06:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('creditcard', '0003_auto_20200105_0621'),
    ]

    operations = [
        migrations.AlterField(
            model_name='creditcard',
            name='type',
            field=models.PositiveSmallIntegerField(choices=[(1, 'mastercard'), (2, 'visa'), (3, 'amex'), (4, 'other')], default=1),
        ),
    ]
