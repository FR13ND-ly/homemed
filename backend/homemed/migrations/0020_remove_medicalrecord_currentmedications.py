# Generated by Django 4.1.7 on 2023-03-23 10:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('homemed', '0019_patient_availabletimeend_patient_availabletimestart'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='medicalrecord',
            name='currentMedications',
        ),
    ]
