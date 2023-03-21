import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, switchMap, tap } from 'rxjs';
import { AppointmentsService } from 'src/app/shared/data-access/appointments.service';
import { getUser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent {
  
  constructor(
    private appointmentsService: AppointmentsService,
    private store: Store,
  ) {}

  user$: any = this.store.select(getUser).pipe(
    filter((user) => !!user)
  );

  appointments$: any = this.user$.pipe(
    filter((user) => !!user),
    switchMap((user: any) => this.appointmentsService.getAppointments(user.uid))
  );
}
