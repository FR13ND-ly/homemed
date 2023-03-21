import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable, switchMap } from 'rxjs';
import { DoctorService } from 'src/app/shared/data-access/doctor.service';
import { FilesService } from 'src/app/shared/data-access/files.service';
import { getUser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  constructor(private store: Store, private doctorService: DoctorService, private filesService: FilesService) { }
  
  avatarId! : number

  user$ : Observable<any> = this.store.select(getUser).pipe(
    filter((user: any) => user != null)
  )
  
  doctor$ : Observable<any> = this.user$.pipe(
    switchMap((user: any) => this.doctorService.getDoctor(user.uid))
  )

  onUpdateDoctor(doctor : any) {
    if (this.avatarId) doctor.avatarId = this.avatarId
    this.doctorService.updateDoctor(doctor).subscribe()
  }

  onChangeAvatar(e : any) {
    this.filesService.addFile(e.target.files[0]).subscribe((res: any) => this.avatarId = res)
  }
}
