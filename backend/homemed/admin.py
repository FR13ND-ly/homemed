from django.contrib import admin
from .models import Profile, Doctor, Patient, Appointment, Invitation, File, MedicalRecord, Consultation

admin.site.register(Profile)
admin.site.register(Doctor)
admin.site.register(Patient)
admin.site.register(Appointment)
admin.site.register(Invitation)
admin.site.register(File)
admin.site.register(MedicalRecord)
admin.site.register(Consultation)