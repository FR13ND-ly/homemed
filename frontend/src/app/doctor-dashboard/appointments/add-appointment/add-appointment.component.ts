import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppointmentsService } from 'src/app/shared/data-access/appointments.service';
import { DoctorService } from 'src/app/shared/data-access/doctor.service';
import { getUser } from 'src/app/store/user/user.selector';
import { BehaviorSubject, filter, switchMap, tap } from 'rxjs';
import { dateUtil } from 'src/app/shared/utils/dates';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent {

  constructor(
    private appointmentsService: AppointmentsService,
    private doctorService: DoctorService,
    private store: Store,
    public dialog: MatDialog
  ) {}

  uid!: any;
  patientless : boolean = false

  dateUtil = {...dateUtil}

  user$: any = this.store.select(getUser).pipe(
    filter((user) => !!user),
    tap((res) =>  this.uid = res.uid)
  );

  patients$: any = this.user$.pipe(
    switchMap((user: any) => this.doctorService.getPatients(user.uid))
  );

  start = 8
  end = 23
  
  minDate = new Date()

  range = (start : any, stop : any) =>{
    if (!(start && stop)) {
      start = 8
      stop = 23
    }
    return Array(Math.ceil(stop - start)).fill(start).map((x, y) => x + y)
  }
  addAppointment(form: any) {
    let appointments = {
      uid: this.uid,
      patientId: form.form.value.patient ? form.form.value.patient : 0,
      scheduledDate: form.form.value.date,
      scheduledTime: form.form.value.time,
      patientless: form.form.value.patientless,
      title: form.form.value.title,
      duration: form.form.value.duration,
      description: form.form.value.details,
      important: !!form.form.value.important,
    };
    this.appointmentsService.addAppointment(appointments).subscribe(() => this.dialog.closeAll())
  }


  onChangePatient(patient : any) {
    this.start = patient.availableTimeStart
    this.end = patient.availableTimeEnd
  }
}
