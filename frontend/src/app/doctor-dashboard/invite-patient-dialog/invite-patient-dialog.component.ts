import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { InvitationsService } from 'src/app/shared/data-access/invitations.service';
import { getUser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-invite-patient-dialog',
  templateUrl: './invite-patient-dialog.component.html',
  styleUrls: ['./invite-patient-dialog.component.scss']
})
export class InvitePatientDialogComponent {

  constructor(private store : Store, private invitationsService : InvitationsService) {}

  user$ = this.store.select(getUser)

  codeGenerated : boolean = false
  code : any = ""

  createInvitation(uid : any) {
    this.invitationsService.createInvitation(uid).subscribe((res) => {
      this.codeGenerated = true
      this.code = res
    })
  }
}
