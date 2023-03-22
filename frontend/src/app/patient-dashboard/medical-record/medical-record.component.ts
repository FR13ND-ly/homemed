import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PatientsService } from 'src/app/shared/data-access/patients.service';
import { getUser } from 'src/app/store/user/user.selector';
import { filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.scss']
})
export class MedicalRecordComponent {

  constructor(private store: Store, private patientsService: PatientsService) { }

  patient$ : Observable<any> = this.store.select(getUser).pipe(
    filter((user) => !!user),
    switchMap((user) => this.patientsService.getMedicalRecords(user.uid))
  )
}
