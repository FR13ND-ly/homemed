import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { logout } from 'src/app/store/user/user.actions';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../feature/material.module';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private store: Store) { }

  @Input()
  items : any = []

  @Input()
  validated : boolean = true

  @Input()
  origin : string = ''

  onLogout() {
    this.store.dispatch(logout())
  }

}
