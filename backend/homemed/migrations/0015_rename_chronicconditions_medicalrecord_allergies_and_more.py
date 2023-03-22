# Generated by Django 4.1.7 on 2023-03-21 22:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homemed', '0014_remove_medicalrecord_address_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='medicalrecord',
            old_name='chronicConditions',
            new_name='allergies',
        ),
        migrations.AddField(
            model_name='medicalrecord',
            name='chronicDiseases',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='medicalrecord',
            name='currentMedications',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='medicalrecord',
            name='familyHistory',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='medicalrecord',
            name='personalHistory',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='medicalrecord',
            name='surgeries',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]
