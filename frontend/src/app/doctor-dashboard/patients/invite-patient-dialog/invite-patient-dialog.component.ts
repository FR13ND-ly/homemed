import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter, map, Observable, switchMap } from 'rxjs';
import { DoctorService } from 'src/app/shared/data-access/doctor.service';
import { InvitationsService } from 'src/app/shared/data-access/invitations.service';
import { getUser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-invite-patient-dialog',
  templateUrl: './invite-patient-dialog.component.html',
  styleUrls: ['./invite-patient-dialog.component.scss']
})
export class InvitePatientDialogComponent {

  constructor(private store : Store, private invitationsService : InvitationsService, private doctorService : DoctorService, private dialog : MatDialog) {}

  InvitationLink$ : Observable<any> = this.store.select(getUser).pipe(
    filter(user => !!user),
    switchMap((user : any) => this.invitationsService.createInvitation(user.uid).pipe(
      map(code => location.origin + "/login/" + code)
    ))
  )

  email : string = ''

  onSendEmail(code: any) {
    let content = `
      Dear ${this.email},

      We are glad to inform you that you have been invited to create an account on our patient portal. With this account, you can access your medical records, appointments, and communicate with your healthcare provider.

      To activate your account, please click on the following link:
      ${code}

      If you have any questions or need assistance with activating your account, please do not hesitate to contact us.

      Best regards,
      HomeMed
    `
    this.doctorService.sendEmail({
      subject : "Invitation Link",
      content,
      recipient : this.email
    }).subscribe(() => this.dialog.closeAll())
  }

  copyToClipboard(text :string) {
    navigator.clipboard.writeText(text)
  }
}
