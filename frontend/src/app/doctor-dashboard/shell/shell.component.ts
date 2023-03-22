import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap, filter } from 'rxjs';
import { DoctorService } from 'src/app/shared/data-access/doctor.service';
import { getUser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  constructor(private store : Store, private doctorsService : DoctorService, private router : Router) { }

  menu = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      link: '/'
    },
    {
      name: 'Patients',
      icon: 'people',
      link: '/patients'
    },
    {
      name: 'Appointments',
      icon: 'event',
      link: '/appointments'
    },
    {
      name: 'Consultations',
      icon: 'assignment',
      link: '/consultations'
    },
    {
      name: 'Settings',
      icon: 'settings',
      link: '/settings'
    },
  ]

  validated$ = this.store.select(getUser).pipe( 
    filter((user : any) => user != null),
    switchMap((user : any) => this.doctorsService.getValidation(user.uid).pipe(
      map((res: any) => res.validated)
  )))

  ngOnInit(): void {
    this.validated$.subscribe((res) => {
      if (res) return 
      this.router.navigate(['dashboard/doctor/error'])
    })
  }
}
