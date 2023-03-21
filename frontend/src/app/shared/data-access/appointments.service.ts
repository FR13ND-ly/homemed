import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient) { }

  readonly apiURL = environment.apiURL + 'appointments/'

  getAppointments(uid : any) {
    return this.http.get(`${this.apiURL}all/${uid}/`)
  }
  
  addAppointment(appointment : any) {
    return this.http.post(`${this.apiURL}add/`, appointment)
  }

  deleteAppointment(id : any) {
    return this.http.delete(`${this.apiURL}delete/${id}/`)
  }
  
  updateAppointment(id : any, appointment : any) {
    return this.http.put(`${this.apiURL}update/${id}/`, appointment)
  }
}
