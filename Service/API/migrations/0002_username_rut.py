# Generated by Django 4.0.4 on 2022-04-25 16:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='username',
            name='rut',
            field=models.CharField(default=1, max_length=12),
            preserve_default=False,
        ),
    ]
