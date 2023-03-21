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
}
