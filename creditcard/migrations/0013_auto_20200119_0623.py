# Generated by Django 3.0.2 on 2020-01-19 06:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('creditcard', '0012_auto_20200116_0701'),
    ]

    operations = [
        migrations.AlterField(
            model_name='creditcard',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
