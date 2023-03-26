import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DoctorService } from 'src/app/shared/data-access/doctor.service';
import { getUser } from 'src/app/store/user/user.selector';
import { InvitePatientDialogComponent } from './invite-patient-dialog/invite-patient-dialog.component';
import { filter, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { TransferPatientDialogComponent } from './transfer-patient-dialog/transfer-patient-dialog.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent {

  constructor(public dialog: MatDialog, private store : Store, private doctorService: DoctorService) {}

  edit : boolean = false

  selectedIndex$ = new BehaviorSubject(0)
  patients$ : Observable<any> = this.store.select(getUser).pipe(
    filter((user : any) => user != null),
    switchMap((user : any) => this.doctorService.getPatients(user.uid))
  )
  
  medicalRecords$ : Observable<any> = this.selectedIndex$.pipe(
    switchMap((index : number) => this.patients$.pipe(
      switchMap(patients => this.doctorService.getMedicalRecords(patients[index].uid).pipe(
        map((res : any) => ({...res, ...{ showText: res.currentMedications, selectedIndex : 0 }}))
      )))
    )
  )

  onUpdateChanges(patient : any) {
    this.edit = false
    this.onSelectDisease(patient.selectedIndex, patient)
    this.doctorService.updateMedicalRecords(patient).subscribe()
  }

  onSelectDisease(index : number, patient : any) {
    if (!index) patient.showText = patient.currentMedications
    else if (index === 1) patient.showText = patient.chronicDiseases
    else if (index === 2) patient.showText = patient.allergies
    else if (index === 3) patient.showText = patient.surgeries
    else if (index === 4) patient.showText = patient.traumas
    else if (index === 5) patient.showText = patient.familyHistory
    patient.selectedIndex = index
  }
    

  openDialog() {
    this.dialog.open(InvitePatientDialogComponent)
  }

  onTransferPatient(patientUID : any) {
    this.dialog.open(TransferPatientDialogComponent, {
      data : {
        patientUID
      }
    })
  }
}
