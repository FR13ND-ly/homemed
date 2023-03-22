# Generated by Django 4.1.7 on 2023-03-21 21:57

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('homemed', '0011_rename_firstname_medicalrecord_name_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='medicalrecord',
            name='birthDay',
        ),
        migrations.RemoveField(
            model_name='medicalrecord',
            name='birthMonth',
        ),
        migrations.RemoveField(
            model_name='medicalrecord',
            name='birthYear',
        ),
        migrations.RemoveField(
            model_name='medicalrecord',
            name='birth_county',
        ),
        migrations.RemoveField(
            model_name='medicalrecord',
            name='birth_town',
        ),
        migrations.AddField(
            model_name='medicalrecord',
            name='date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]