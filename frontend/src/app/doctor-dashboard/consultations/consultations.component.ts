import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { DoctorService } from 'src/app/shared/data-access/doctor.service';
import { getUser } from 'src/app/store/user/user.selector';
import { switchMap, filter, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { FilesService } from 'src/app/shared/data-access/files.service';

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.scss']
})
export class ConsultationsComponent {

  constructor(private store: Store, private doctorService: DoctorService, private fileService : FilesService) {}

  selectedIndex$ = new BehaviorSubject(0);

  patientId! : any

  patients$ : Observable<any> = this.store.select(getUser).pipe(
    filter(user => !!user),
    switchMap(user => this.doctorService.getPatients(user.uid))
  )

  consultations$ : Observable<any> = this.selectedIndex$.pipe(
    switchMap(index => this.patients$.pipe(
      tap(patients => this.patientId = patients[index].id),
      switchMap(patients => this.doctorService.getConsultations(patients[index].id))
    ))   
  )

  onAddConsultation(e : any) {
    this.fileService.addFile(e.target.files[0]).pipe(
      switchMap(fileId => this.doctorService.addConsultation({
        fileId,
        patientId : this.patientId,
      }))
    ).subscribe(() => {
      this.selectedIndex$.next(this.selectedIndex$.value)
    })
  } 

  onDeleteConsultation(id : any) {
    this.doctorService.deleteConsultation(id).subscribe(() => {
      this.selectedIndex$.next(this.selectedIndex$.value)
    })
  }

}
