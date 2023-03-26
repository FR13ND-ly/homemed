import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorService } from 'src/app/shared/data-access/doctor.service';

@Component({
  selector: 'app-transfer-patient-dialog',
  templateUrl: './transfer-patient-dialog.component.html',
  styleUrls: ['./transfer-patient-dialog.component.scss']
})
export class TransferPatientDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private doctorService: DoctorService, private dialog: MatDialog) {}

  newDoctorUID : string = ''

  onChangeDoctor() {
    let data = {
      patientUID : this.data.patientUID,
      doctorUID: this.newDoctorUID
    }
    this.doctorService.transferPatient(data).subscribe(() => this.dialog.closeAll())
  }
}
