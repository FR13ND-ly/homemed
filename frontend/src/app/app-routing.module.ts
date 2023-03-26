import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./landing-page/shell/shell.module').then(m => m.ShellModule) },
  { path: 'login', loadChildren: () => import('./login-page/shell/shell.module').then(m => m.ShellModule) },
  { path: 'login/:code', loadChildren: () => import('./login-page/shell/shell.module').then(m => m.ShellModule) },
  { path: 'about', component: AboutComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'dashboard/doctor', loadChildren: () => import('./doctor-dashboard/shell/shell.module').then(m => m.ShellModule) },
  { path: 'dashboard/patient', loadChildren: () => import('./patient-dashboard/shell/shell.module').then(m => m.ShellModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
