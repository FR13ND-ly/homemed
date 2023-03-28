import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvitationsService {

  constructor(private http : HttpClient) { }

  readonly APIUrl = environment.apiURL + 'invitations/'

  createInvitation(uid : any) {
    return this.http.get(`${this.APIUrl}create/${uid}/`)
  }

  checkInvitation(code : any) {
    return this.http.get(`${this.APIUrl}check/${code}/`)
  }
}
