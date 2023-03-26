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
      link: '/main'
    },
    {
      name: 'Appointments',
      icon: 'event',
      link: '/appointments'
    },
    {
      name: 'Consultations',
      icon: 'folder_open',
      link: '/consultations'
    },
    {
      name: 'Medical Records',
      icon: 'text_snippet',
      link: '/medical-record'
    },
    {
      name: 'Settings',
      icon: 'settings',
      link: '/settings'
    },
  ]
  
}
