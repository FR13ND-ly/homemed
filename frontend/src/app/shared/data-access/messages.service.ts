import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { child, get, getDatabase, ref } from '@angular/fire/database';
import { from, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor() { }

  auth = getAuth()
  db = ref(getDatabase())
  
  getMessages(doctorId : any, patientId : any) {
    console.log(doctorId, patientId)
    get(child(this.db, `messages/${doctorId}/${patientId}`)).then((snapshot) => {
      console.log(snapshot.val())
    })
    return from(get(child(this.db, `messages/${doctorId}/${patientId}`))).pipe(
      tap(() => console.log('a'))
    )
  }
}
