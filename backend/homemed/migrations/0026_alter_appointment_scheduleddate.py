# Generated by Django 4.1.7 on 2023-03-26 19:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homemed', '0025_appointment_scheduledtime_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='scheduledDate',
            field=models.DateTimeField(),
        ),
    ]
