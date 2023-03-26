import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter, switchMap, tap } from 'rxjs';
import { AppointmentsService } from 'src/app/shared/data-access/appointments.service';
import { DoctorService } from 'src/app/shared/data-access/doctor.service';
import { getUser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-appointment-editor',
  templateUrl: './appointment-editor.component.html',
  styleUrls: ['./appointment-editor.component.scss'],
})
export class AppointmentEditorComponent implements OnInit {
  constructor(
    private appointmentsService: AppointmentsService,
    private doctorService: DoctorService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store : Store
  ) {
  }

  ngOnInit(): void {
    console.log(this.data)
  }

  range = (start : any, stop : any) =>{
    if (!(start && stop)) {
      start = 8
      stop = 23
    }
    return Array(Math.ceil(stop - start)).fill(start).map((x, y) => x + y)
  }
  patients$: any = this.store.select(getUser).pipe(
    filter((user) => !!user),
    switchMap((user: any) => this.doctorService.getPatients(user.uid))
  );

  minDate = new Date()

  updateAppointment(form: any) {
    let appointment = {
      patientId: form.form.value.patient,
      scheduledDate: form.form.value.date,
      scheduledTime: form.form.value.time,
      title: form.form.value.title,
      duration: form.form.value.duration,
      description: form.form.value.details,
      patientless: form.form.value.patientless,
      important: form.form.value.important,
    };
    this.appointmentsService.updateAppointment(this.data.id, appointment).subscribe(() => this.dialog.closeAll())
  }
}
