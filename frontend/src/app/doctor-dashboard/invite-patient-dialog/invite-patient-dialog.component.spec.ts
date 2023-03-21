import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitePatientDialogComponent } from './invite-patient-dialog.component';

describe('InvitePatientDialogComponent', () => {
  let component: InvitePatientDialogComponent;
  let fixture: ComponentFixture<InvitePatientDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitePatientDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitePatientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
