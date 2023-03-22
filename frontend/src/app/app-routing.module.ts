import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./landing-page/shell/shell.module').then(m => m.ShellModule) },
  { path: 'login', loadChildren: () => import('./login-page/shell/shell.module').then(m => m.ShellModule) },
  { path: 'login/:code', loadChildren: () => import('./login-page/shell/shell.module').then(m => m.ShellModule) },
  { path: 'dashboard/doctor', loadChildren: () => import('./doctor-dashboard/shell/shell.module').then(m => m.ShellModule) },
  { path: 'dashboard/patient', loadChildren: () => import('./patient-dashboard/shell/shell.module').then(m => m.ShellModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
