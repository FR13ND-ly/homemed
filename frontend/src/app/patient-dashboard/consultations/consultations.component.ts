import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable, switchMap } from 'rxjs';
import { PatientsService } from 'src/app/shared/data-access/patients.service';
import { getUser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.scss']
})
export class ConsultationsComponent {
  
  constructor(private store : Store, private patientsService : PatientsService ) {}

  consultations$ : Observable<any> = this.store.select(getUser).pipe(
    filter(user => !!user),
    switchMap(user => this.patientsService.getPatientConsultations(user.uid))
  )
    
}
