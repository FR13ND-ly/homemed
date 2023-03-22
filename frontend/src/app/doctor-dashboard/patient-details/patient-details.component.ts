import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/shared/data-access/doctor.service';
import { PatientsService } from 'src/app/shared/data-access/patients.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TransferPatientDialogComponent } from '../transfer-patient-dialog/transfer-patient-dialog.component';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss'],
})
export class PatientDetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    public dialog: MatDialog
  ) {}

  newDoctorUID : any = ""

  editMode : boolean = false

  patient$ : Observable<any> = this.route.paramMap.pipe(
    switchMap((params) => this.doctorService.getMedicalRecords(params.get('uid'))
  ));

  onChangeDoctor(patientUID : any) {
    let data = {
      patientUID,
      doctorUID: this.newDoctorUID
    }
    this.dialog.open(TransferPatientDialogComponent, { data })
  }

  onUpdateChanges(patient : any) {
    this.doctorService.updateMedicalRecords(patient).subscribe(() => {
      this.editMode = false
    })
    
  }
}
