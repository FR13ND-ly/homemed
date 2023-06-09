# Generated by Django 4.1.7 on 2023-03-20 20:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homemed', '0005_alter_doctor_birthday_alter_patient_birthday'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='duration',
            field=models.PositiveIntegerField(default=30),
        ),
        migrations.AlterField(
            model_name='doctor',
            name='validated',
            field=models.BooleanField(default=False),
        ),
    ]
