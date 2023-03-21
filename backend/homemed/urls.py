from django.urls import path, include
from . import views

urlpatterns = [
    #patients
    path('patients/get/<str:uid>/', views.get_patient),
    path('patients/update/<str:uid>/', views.update_patient),
    path('patients/transfer/', views.transfer_patient),
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
    path('doctor/update/<str:uid>/', views.update_doctor),
    #invitations
    path('invitations/create/<str:uid>/', views.create_invitation),
    #files
    path('files/upload/', views.upload_file),
]