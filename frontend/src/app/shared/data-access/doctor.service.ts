import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  readonly apiURL = environment.apiURL + 'doctor/'

  getPatients(uid : any) {
    return this.http.get(`${this.apiURL}patients/${uid}/`)
  }

  getDoctor(uid : any) {
    return this.http.get(`${this.apiURL}get/${uid}/`)
  }

  updateDoctor(doctor : any) {
    return this.http.put(`${this.apiURL}update/${doctor.uid}/`, doctor)
  }

  getConsultations(patientId : any) {
    return this.http.get(`${this.apiURL}consultations/get/${patientId}/`)
  }

  getMedicalRecords(uid : any) {
    return this.http.get(`${this.apiURL}medical-records/get/${uid}/`)
  }

  updateMedicalRecords(medicalRecords : any) {
    return this.http.put(`${this.apiURL}medical-records/update/${medicalRecords.uid}/`, medicalRecords)
  }

  addConsultation(consultation : any) {
    return this.http.post(`${this.apiURL}consultations/add/`, consultation)
  }

  deleteConsultation(consultationId : any) {
    return this.http.delete(`${this.apiURL}consultations/delete/${consultationId}/`)
  }

  getValidation(uid : any) {
    return this.http.get(`${this.apiURL}validation/${uid}/`)
  }

  getDashboard(uid : any) {
    return this.http.get(`${this.apiURL}dashboard/${uid}/`)
  }

  transferPatient(data : any) {
    return this.http.post(`${this.apiURL}transfer/`, data)
  }

  sendEmail(data : any) {
    return this.http.post(`${this.apiURL}email/send/`, data)
  }

  getDoctorByCounty(data: any) {
    return this.http.post(`${this.apiURL}get-by-county/`, data)
  }
}
