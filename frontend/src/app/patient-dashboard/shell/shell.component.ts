import { Component } from '@angular/core';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {

  menu = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      link: '/'
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
      name: 'Medical Record',
      icon: 'assignment',
      link: '/medical-record'
    },
    {
      name: 'Settings',
      icon: 'settings',
      link: '/settings'
    },
  ]
  
}
