# Generated by Django 3.0.2 on 2020-01-05 06:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('creditcard', '0002_auto_20200104_2101'),
    ]

    operations = [
        migrations.AlterField(
            model_name='creditcard',
            name='type',
            field=models.PositiveSmallIntegerField(choices=[(1, 'Mastercard'), (2, 'Visa'), (3, 'American Express'), (4, 'Other')], default=1),
        ),
    ]
