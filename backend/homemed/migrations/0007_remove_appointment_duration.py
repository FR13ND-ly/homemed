# Generated by Django 4.1.7 on 2023-03-20 22:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('homemed', '0006_appointment_duration_alter_doctor_validated'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appointment',
            name='duration',
        ),
    ]
