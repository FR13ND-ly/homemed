import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  readonly APIUrl = environment.apiURL + 'files/'

  addFile(file : any) {
    let formData = new FormData()
    formData.append('file', file, file.name)
    return this.http.post(`${this.APIUrl}upload/`, formData)
  }
}
