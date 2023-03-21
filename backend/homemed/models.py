from django.db import models
from django.utils import timezone

class Profile(models.Model):
    uid = models.CharField(max_length=255, unique=True)
    fid = models.PositiveIntegerField(null=True)
    type = models.CharField(max_length=255, default="doctor")
    name = models.CharField(max_length=255)
    avatarId = models.PositiveIntegerField(null=True)
    date = models.DateTimeField(default=timezone.now)

class Doctor(models.Model):
    birthday = models.DateTimeField()
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    validated = models.BooleanField(default=False)
    validationImageId = models.PositiveIntegerField(null=True)

class Patient(models.Model):
    birthday = models.DateTimeField()
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    doctorId = models.PositiveIntegerField(null=True)

class File(models.Model):
    file = models.FileField(blank=False, null=False)
    date = models.DateTimeField(default=timezone.now)

class Appointment(models.Model):
    scheduledDate = models.DateTimeField()
    title = models.CharField(max_length=255)
    doctorId = models.PositiveIntegerField(null=True)
    patientId = models.PositiveIntegerField(null=True)
    duration = models.PositiveIntegerField(default=30)
    description = models.TextField()
    important = models.BooleanField(default = False)
    date = models.DateTimeField(default=timezone.now)

class Invitation(models.Model):
    doctorId = models.PositiveIntegerField(null=True)
    code = models.CharField(max_length=255, unique=True)
    date = models.DateTimeField(default=timezone.now)