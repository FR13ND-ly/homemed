import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/shared/data-access/doctor.service';
import { PatientsService } from 'src/app/shared/data-access/patients.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss'],
})
export class PatientDetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private patientService: PatientsService
  ) {}

  newDoctorUID : any = ""

  patient$ : Observable<any> = this.route.paramMap.pipe(
    switchMap((params) => this.patientService.getPatient(params.get('uid'))
  ));

  onChangeDoctor(patientUID : any) {
    let data = {
      patientUID,
      doctorUID: this.newDoctorUID
    }
    this.patientService.transferPatient(data).subscribe()
  }

}
