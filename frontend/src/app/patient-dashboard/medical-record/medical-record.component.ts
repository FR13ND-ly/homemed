import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PatientsService } from 'src/app/shared/data-access/patients.service';
import { getUser } from 'src/app/store/user/user.selector';
import { filter, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.scss']
})
export class MedicalRecordComponent {

  constructor(private store: Store, private patientsService: PatientsService) { }

  medicalRecords$ : Observable<any> = this.store.select(getUser).pipe(
    filter((user) => !!user),
    switchMap((user) => this.patientsService.getMedicalRecords(user.uid).pipe(
      map((res : any) => ({...res, ...{ showText: res.currentMedications, selectedIndex : 0 }}))
    ))
  )

  onSelectDisease(index : number, patient : any) {
    if (!index) patient.showText = patient.currentMedications
    else if (index === 1) patient.showText = patient.chronicDiseases
    else if (index === 2) patient.showText = patient.allergies
    else if (index === 3) patient.showText = patient.surgeries
    else if (index === 4) patient.showText = patient.traumas
    else if (index === 5) patient.showText = patient.familyHistory
    patient.selectedIndex = index
  }
  
}
