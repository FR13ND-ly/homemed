import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable, switchMap } from 'rxjs';
import { DoctorService } from 'src/app/shared/data-access/doctor.service';
import { getUser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private store : Store, private doctorService : DoctorService) { }
  
  dashboard$ : Observable<any> = this.store.select(getUser).pipe(
    filter(user => !!user),
    switchMap(user => this.doctorService.getDashboard(user.uid))
  )
}
