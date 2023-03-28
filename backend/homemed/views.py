from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from .models import Profile, File, Doctor, Patient, Invitation, Appointment, Consultation, MedicalRecord
import os
from django.core.files import File as fileReader
import urllib.request
from django.conf import settings
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from PIL import Image
import PIL
import random 
import string
import datetime
from django.core.mail import send_mail
URL="http://127.0.0.1:8000/"

@csrf_exempt
def send_email(request):
    data = JSONParser().parse(request)
    send_mail(
        data['subject'],
        data['content'],
        'motricala44@gmail.com',
        [data['recipient']],
        fail_silently=False,
    )
    return JsonResponse({"success" : True})

@csrf_exempt
def check_user(request):
    data = JSONParser().parse(request)
    response = {
        "exists" : False,
        "validated" : False,
        "doctorId" : None,
        "type" : "doctor",
    }
    profiles = Profile.objects.filter(uid=data['uid'])
    if profiles.exists():
        profile = profiles.first()
        response["type"] = profile.type
        response["exists"] = True
        if (profile == "doctor"):
            doctor = Doctor.objects.get(id=profile.fid)
            response["validated"] = doctor.validated
    return JsonResponse(response)

@csrf_exempt
def register(request):
    data = JSONParser().parse(request)
    profile = Profile.objects.create(
        uid = data['uid'],
        name = data['name'],
        type = data['type'],
        avatarId = add_file(data['photoURL'], data['uid']),
    )
    if (data['type'] == "doctor"):
        profile.type = "doctor"
        profile.fid = create_doctor(data)
    else:
        profile.type = "patient"
        invitation = Invitation.objects.get(code=data['invitationCode'])
        data['doctorId'] = invitation.doctorId
        profile.fid = create_patient(data)
        create_medical_record(profile.fid)
        invitation.delete()
    profile.save()
    response = {
        "uid" : profile.uid,
        "type" : profile.type,
        "name" : profile.name,
        "imageUrl" : get_file(profile.avatarId),
    }
    return JsonResponse(response)

@csrf_exempt
def get_user(request, uid):
    profiles = Profile.objects.filter(uid=uid)
    if not profiles.exists():
        return JsonResponse({})
    profile = profiles.first()
    response = {
        "uid" : profile.uid,
        "type" : profile.type,
        "name" : profile.name,
        "imageUrl" : get_file(profile.avatarId),
    }
    return JsonResponse(response)

def doctor_dashboard(request, uid):
    profile = Profile.objects.get(uid=uid)
    doctor = Doctor.objects.get(id=profile.fid)
    response = {
        "uid" : uid,
        "name" : profile.name,
        "patientsCount" : Patient.objects.filter(doctorId=doctor.id).count(),
        "consultationsCount" : Consultation.objects.filter(doctorId=doctor.id).count(),
        "appointmentsCount" : Appointment.objects.filter(doctorId=doctor.id).count(),
        "appointmentsToday" : Appointment.objects.filter(doctorId=doctor.id, scheduledDate=datetime.date.today()).count(),
    }
    return JsonResponse(response)


def patient_dashboard(request, uid):
    profile = Profile.objects.get(uid=uid)
    patient = Patient.objects.get(id=profile.fid)
    response = {
        "uid" : uid,
        "name" : profile.name,
        "doctor" : {
            "id" : patient.doctorId,
            "name" : Profile.objects.filter(type="doctor").get(fid=patient.doctorId).name,
            "imageUrl" : get_file(Profile.objects.filter(type="doctor").get(fid=patient.doctorId).avatarId),
            "email" : Doctor.objects.get(id=patient.doctorId).email,
        },
        "consultationsCount" : Consultation.objects.filter(patientId=patient.id).count(),
        "appointmentsCount" : Appointment.objects.filter(patientId=patient.id).count(),
        "appointmentsToday" : Appointment.objects.filter(patientId=patient.id, scheduledDate=datetime.date.today()).count(),
    }
    return JsonResponse(response)

@csrf_exempt
def get_doctors_by_county(request):
    data = JSONParser().parse(request)
    doctors = Doctor.objects.filter(county=data['county'])
    response = []
    for doctor in doctors:
        profile = Profile.objects.filter(type="doctor").get(fid=doctor.id)
        response.append({
            "id" : doctor.id,
            "name" : profile.name,
            "email" : doctor.email,
            "patientsCount" : Patient.objects.filter(doctorId=doctor.id).count(),
        })
    return JsonResponse(response, safe=False)

def get_appointments(request, uid):
    profile = Profile.objects.get(uid=uid)
    if (profile.type == "doctor"):
        appointments = Appointment.objects.filter(doctorId=profile.fid).order_by('scheduledDate')
    else:
        appointments = Appointment.objects.filter(patientId=profile.fid).order_by('scheduledDate')
    response = []
    for appointment in appointments:
        raw = {
            "uid" : uid,
            "id" : appointment.id,
            "scheduledDate" : appointment.scheduledDate,
            "scheduledTime" : appointment.scheduledTime,
            "title" : appointment.title,
            "patientless" : appointment.patientless,
            "doctor" : {
                "name" : Profile.objects.filter(type="doctor").get(fid=appointment.doctorId).name,
                "imageUrl" : get_file(Profile.objects.filter(type="doctor").get(fid=appointment.doctorId).avatarId),
            },
            "patient" : {},
            "duration" : appointment.duration,
            "description" : appointment.description,
            "important" : appointment.important,
            "date" : appointment.date,
        }
        if not appointment.patientless:
            patient = Patient.objects.get(id=appointment.patientId)
            raw["patient"] = {
                "id" : appointment.patientId,
                "name" : Profile.objects.filter(type="patient").get(fid=appointment.patientId).name,
                "imageUrl" : get_file(Profile.objects.filter(type="patient").get(fid=appointment.patientId).avatarId),
                "availableTimeStart" : patient.availableTimeStart,
                "availableTimeEnd" : patient.availableTimeEnd,
            }
        response.append(raw)
    return JsonResponse(response, safe=False) 

def get_appointment(request, id):
    appointment = Appointment.objects.get(id=id)
    response = {
        "id" : appointment.id,
        "scheduledDate" : appointment.scheduledDate,
        "scheduledTime" : appointment.scheduledTime,
        "title" : appointment.title,
        "patient" : appointment.patientId,
        "duration" : appointment.duration,
        "description" : appointment.description,
        "important" : appointment.important,
    }
    return JsonResponse(response)

@csrf_exempt
def add_appointment(request):
    data = JSONParser().parse(request)
    appointment = Appointment.objects.create(
        doctorId = Profile.objects.get(uid=data['uid']).fid,
        patientId = data['patientId'],
        scheduledDate = data['scheduledDate'],
        scheduledTime = data['scheduledTime'],
        patientless = data['patientless'],
        duration = data['duration'],
        title = data['title'],
        description = data['description'],
        important = data['important'],
    )
    appointment.save()
    return JsonResponse({"success" : True})

@csrf_exempt
def update_appointment(request, id):
    data = JSONParser().parse(request)
    appointment = Appointment.objects.get(id=id)
    appointment.scheduledDate = data['scheduledDate']
    appointment.scheduledTime = data['scheduledTime']
    appointment.title = data['title']
    appointment.description = data['description']
    appointment.duration = data['duration']
    appointment.important = data['important']
    appointment.patientless = data['patientless']
    appointment.save()
    return JsonResponse({"success" : True})

@csrf_exempt
def delete_appointment(request, id):
    appointment = Appointment.objects.get(id=id)
    appointment.delete()
    return JsonResponse({"success" : True})


def create_doctor(data):
    doctor = Doctor.objects.create(
        birthday = data['birthday'],
        address = data['address'],
        county = data['county'],
        phone = data['phone'],
        email = data['email'],
        validationImageId = data['validationImageId'],
    )
    doctor.save()
    return doctor.id

def get_doctor(request, uid):
    doctor = Doctor.objects.get(id=Profile.objects.get(uid=uid).fid)
    profile = Profile.objects.filter(type="doctor").filter(fid=doctor.id).first()
    response = {
        "uid" : uid,
        "id" : doctor.id,
        "name" : profile.name,
        "birthday" : doctor.birthday,
        "address" : doctor.address,
        "phone" : doctor.phone,
        "county" : doctor.county,
        "email" : doctor.email,
        "avatarId" : profile.avatarId,
    }
    return JsonResponse(response)

def doctor_validated(request, uid):
    doctor = Doctor.objects.get(id=Profile.objects.get(uid=uid).fid)
    return JsonResponse({"validated" : doctor.validated})

@csrf_exempt
def update_doctor(request, uid):
    data = JSONParser().parse(request)  
    profile = Profile.objects.get(uid=uid)
    profile.name = data['name']
    profile.avatarId = data['avatarId']
    profile.save()
    doctor = Doctor.objects.get(id=profile.fid)
    doctor.birthday = data['birthday']
    doctor.address = data['address']
    doctor.county = data['county']
    doctor.phone = data['phone']
    doctor.email = data['email']
    doctor.save()
    return JsonResponse({"success": True})

def create_patient(data):
    patient = Patient.objects.create(
        birthday = data['birthday'],
        address = data['address'],
        county = data['county'],
        phone = data['phone'],
        email = data['email'],
        doctorId = data['doctorId']
    )
    patient.save()
    return patient.id

def get_patients(request, uid):
    doctor = Doctor.objects.get(id=Profile.objects.get(uid=uid).fid)
    patients = Patient.objects.filter(doctorId=doctor.id)
    response = []
    for patient in patients:
        profile = Profile.objects.filter(type="patient").filter(fid=patient.id).first()
        response.append({
            "id" : patient.id,
            "uid" : profile.uid,
            "doctorId" : patient.doctorId,
            "name" : profile.name,
            "availableTimeStart" : patient.availableTimeStart,
            "availableTimeEnd" : patient.availableTimeEnd,
            "imageUrl" : get_file(profile.avatarId),
        })
    return JsonResponse(response, safe=False)

def get_patient(request, uid):
    profile = Profile.objects.get(uid=uid)
    patient = Patient.objects.get(id=profile.fid)
    response = {
        "uid" : uid,
        "id" : patient.id,
        "name" : profile.name,
        "birthday" : patient.birthday,
        "address" : patient.address,
        "phone" : patient.phone,
        "email" : patient.email,
        "county" : patient.county,
        "availableTimeStart" : patient.availableTimeStart,
        "availableTimeEnd" : patient.availableTimeEnd,
        "avatarId" : profile.avatarId,
        "imageUrl" : get_file(profile.avatarId),
    }
    return JsonResponse(response)

@csrf_exempt
def transfer_patient(request):
    data = JSONParser().parse(request)
    patient = Patient.objects.get(id=Profile.objects.get(uid=data['patientUID']).fid)
    patient.doctorId = Profile.objects.get(uid=data['doctorUID']).fid
    patient.save()
    return JsonResponse({"success": True})

@csrf_exempt
def update_patient(request, uid):
    data = JSONParser().parse(request)
    profile = Profile.objects.get(uid=uid)
    profile.name = data['name']
    profile.avatarId = data['avatarId']
    profile.save()
    patient = Patient.objects.get(id=profile.fid)
    patient.birthday = data['birthday']
    patient.address = data['address']
    patient.phone = data['phone']
    patient.county = data['county']
    patient.availableTimeStart = data['availableTimeStart']
    patient.availableTimeEnd = data['availableTimeEnd']
    patient.email = data['email']
    patient.save()
    return JsonResponse({"success": True})


def create_invitation(request, uid):
    doctor = Doctor.objects.get(id=Profile.objects.get(uid=uid).fid)
    invitation = Invitation.objects.create(
        doctorId = doctor.id,
        code = get_random_string(12),
    )
    invitation.save()
    return JsonResponse(invitation.code, safe=False)

def check_invitation(request, code):
    success = Invitation.objects.filter(code=code).exists()
    return JsonResponse({"success" : success})

def get_consultations(request, id):
    consultations = Consultation.objects.filter(patientId=id)
    response = []
    for consultation in consultations:
        response.append({
            "id" : consultation.id,
            "doctor" : {
                "name" : Profile.objects.filter(type="doctor").get(fid=consultation.doctorId).name,
                "imageUrl" : get_file(Profile.objects.filter(type="doctor").get(fid=consultation.doctorId).avatarId),
            },
            "date" : consultation.date,
            "imageUrl" : get_file(consultation.fileId)
        })
    return JsonResponse(response, safe=False)

def get_consultations_by_uid(request, uid):
    consultations = Consultation.objects.filter(patientId=Profile.objects.get(uid=uid).fid)
    response = []
    for consultation in consultations:
        response.append({
            "id" : consultation.id,
            "doctor" : {
                "name" : Profile.objects.filter(type="doctor").get(fid=consultation.doctorId).name,
                "imageUrl" : get_file(Profile.objects.filter(type="doctor").get(fid=consultation.doctorId).avatarId),
            },
            "date" : consultation.date,
            "imageUrl" : get_file(consultation.fileId)
        })
    return JsonResponse(response, safe=False)

@csrf_exempt
def add_consultation(request):
    data = JSONParser().parse(request)
    consultation = Consultation.objects.create(
        patientId = data['patientId'],
        doctorId = Patient.objects.get(id=data['patientId']).doctorId,
        fileId = data['fileId'],
    )
    consultation.save()
    return JsonResponse(consultation.id, safe=False)

@csrf_exempt
def delete_consultation(request, id):
    consultation = Consultation.objects.get(id=id)
    consultation.delete()
    return JsonResponse({"success": True})

def create_medical_record(id):
    medicalRecord = MedicalRecord.objects.create(patientId = id)
    medicalRecord.save()
    return medicalRecord.id

def get_medical_record(request, uid):
    profile = Profile.objects.get(uid=uid)
    patient = Patient.objects.get(id=profile.fid)
    medicalRecord = MedicalRecord.objects.get(patientId=patient.id)
    response = {
        "uid" : uid,
        "name" : profile.name,
        "imageUrl" : get_file(profile.avatarId),
        "birthday" : patient.birthday,
        "address" : patient.address,
        "email" : patient.email,
        "phone" : patient.phone,
        "county" : patient.county,
        "patientId" : medicalRecord.patientId,
        "allergies" : medicalRecord.allergies,
        "chronicDiseases" : medicalRecord.chronicDiseases,
        "currentMedications" : medicalRecord.currentMedications,
        "surgeries" : medicalRecord.surgeries,
        "familyHistory" : medicalRecord.familyHistory,
    }
    return JsonResponse(response)

@csrf_exempt
def update_medical_record(request, uid):
    data = JSONParser().parse(request)
    profile = Profile.objects.get(uid=uid)
    patient = Patient.objects.get(id=profile.fid)
    medicalRecord = MedicalRecord.objects.get(patientId=patient.id)
    medicalRecord.allergies = data['allergies']
    medicalRecord.chronicDiseases = data['chronicDiseases']
    medicalRecord.currentMedications = data['currentMedications']
    medicalRecord.familyHistory = data['familyHistory']
    medicalRecord.surgeries = data['surgeries']
    medicalRecord.save()
    return JsonResponse({"success": True})

@csrf_exempt
def upload_file(request):
    file = File.objects.create(file=request.FILES['file'])
    file.save()
    return JsonResponse(file.id, safe=False)

def add_file(imageUrl, uid):
    image = File.objects.create()
    result = urllib.request.urlretrieve(
        imageUrl + "?.jpg", settings.MEDIA_ROOT + "/" + uid + ".jpg")
    image.file = settings.MEDIA_ROOT + "/" + uid + ".jpg"
    image.save()
    return image.id

def get_file(id):
    return URL + "media/" + os.path.basename(File.objects.get(id=id).file.name)

def get_random_string(length):
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str