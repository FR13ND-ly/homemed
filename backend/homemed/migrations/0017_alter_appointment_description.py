# Generated by Django 4.1.7 on 2023-03-21 22:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homemed', '0016_alter_medicalrecord_allergies_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='description',
            field=models.TextField(default=''),
        ),
    ]
