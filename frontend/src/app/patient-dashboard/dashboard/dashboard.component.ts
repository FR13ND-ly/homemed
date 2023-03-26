import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable, switchMap } from 'rxjs';
import { PatientsService } from 'src/app/shared/data-access/patients.service';
import { getUser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private store: Store, private patientsService: PatientsService) { }

  dashboard$: Observable<any> = this.store.select(getUser).pipe(
    filter(user => !!user),
    switchMap(user => this.patientsService.getDashboard(user.uid))
  )

}
