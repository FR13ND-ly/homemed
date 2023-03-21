import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DoctorService } from 'src/app/shared/data-access/doctor.service';
import { getUser } from 'src/app/store/user/user.selector';
import { InvitePatientDialogComponent } from '../invite-patient-dialog/invite-patient-dialog.component';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent {

  constructor(public dialog: MatDialog, private store : Store, private doctorService: DoctorService) {}

  patients$ : any = this.store.select(getUser).pipe(
    filter((user : any) => user != null),
    switchMap((user : any) => this.doctorService.getPatients(user.uid))
  )

  openDialog() {
    this.dialog.open(InvitePatientDialogComponent)
  }
}
