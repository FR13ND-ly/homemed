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
      name: 'Settings',
      icon: 'settings',
      link: '/settings'
    },
  ]
}
