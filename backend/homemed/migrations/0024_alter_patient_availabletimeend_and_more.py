# Generated by Django 4.1.7 on 2023-03-26 15:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homemed', '0023_alter_patient_availabletimeend'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='availableTimeEnd',
            field=models.PositiveIntegerField(default=22),
        ),
        migrations.AlterField(
            model_name='patient',
            name='availableTimeStart',
            field=models.PositiveIntegerField(default=8),
        ),
    ]