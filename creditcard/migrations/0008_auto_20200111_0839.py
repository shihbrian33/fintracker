# Generated by Django 3.0.2 on 2020-01-11 08:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('creditcard', '0007_auto_20200105_0944'),
    ]

    operations = [
        migrations.AddField(
            model_name='creditcard',
            name='annualfee',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='creditcard',
            name='name',
            field=models.CharField(max_length=50),
        ),
    ]
