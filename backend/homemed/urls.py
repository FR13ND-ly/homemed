from django.urls import path, include
from . import views

urlpatterns = [
    #dashboard
    path('doctor/dashboard/<str:uid>/', views.doctor_dashboard),
    path('patients/dashboard/<str:uid>/', views.patient_dashboard),
    #patients
    path('patients/get/<str:uid>/', views.get_patient),
    path('patients/update/<str:uid>/', views.update_patient),
    path('patients/medical-records/get/<str:uid>/', views.get_medical_record),
    path('patients/consultations/get/<str:uid>/', views.get_consultations_by_uid),
    #appointments
    path('appointments/all/<str:uid>/', views.get_appointments),
    path('appointments/add/', views.add_appointment),
    path('appointments/update/<int:id>/', views.update_appointment),
    path('appointments/delete/<int:id>/', views.delete_appointment),
    #user
    path('user/check/', views.check_user),
    path('user/login/<str:uid>/', views.get_user),
    path('user/register/', views.register),
    #doctor
    path('doctor/patients/<str:uid>/', views.get_patients),
    path('doctor/get/<str:uid>/', views.get_doctor),
    path('doctor/medical-records/get/<str:uid>/', views.get_medical_record),
    path('doctor/medical-records/update/<str:uid>/', views.update_medical_record),
    path('doctor/update/<str:uid>/', views.update_doctor),
    path('doctor/validation/<str:uid>/', views.doctor_validated),
    path("doctor/email/send/", views.send_email),
    path('doctor/transfer/', views.transfer_patient),
    path('doctor/get-by-county/', views.get_doctors_by_county),
    #consultations
    path('doctor/consultations/get/<str:id>/', views.get_consultations),
    path('doctor/consultations/add/', views.add_consultation),
    path('doctor/consultations/delete/<int:id>/', views.delete_consultation),
    #invitations
    path('invitations/create/<str:uid>/', views.create_invitation),
    #files
    path('files/upload/', views.upload_file),
]