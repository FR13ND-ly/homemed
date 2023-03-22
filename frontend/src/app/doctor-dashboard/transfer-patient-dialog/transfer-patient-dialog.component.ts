import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientsService } from 'src/app/shared/data-access/patients.service';

@Component({
  selector: 'app-transfer-patient-dialog',
  templateUrl: './transfer-patient-dialog.component.html',
  styleUrls: ['./transfer-patient-dialog.component.scss']
})
export class TransferPatientDialogComponent {

  constructor(@Inject (MAT_DIALOG_DATA) public data : any, private patientService : PatientsService, private dialog : MatDialog) { }

  newDoctorUID : any = ""
  
  onTransferPatient() {
    let data = {
      patientUID : this.data.patientUID,
      doctorUID: this.newDoctorUID
    }
    this.patientService.transferPatient(data).subscribe(() => this.dialog.closeAll())
  }
  
}
