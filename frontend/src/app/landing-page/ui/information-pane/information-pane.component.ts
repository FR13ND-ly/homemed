import { Component } from '@angular/core';
import { DoctorService } from 'src/app/shared/data-access/doctor.service';
import { counties } from 'src/app/shared/utils/romanian-counties';

@Component({
  selector: 'app-information-pane',
  templateUrl: './information-pane.component.html',
  styleUrls: ['./information-pane.component.scss']
})
export class InformationPaneComponent {

  constructor(private doctorService : DoctorService) { }
  county : string = ''

  counties = [...counties]

  doctors : any = []

  onInput(county : any) {
    this.doctorService.getDoctorByCounty({ county }).subscribe((doctors : any) => this.doctors = doctors)
  }
}
