import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferPatientDialogComponent } from './transfer-patient-dialog.component';

describe('TransferPatientDialogComponent', () => {
  let component: TransferPatientDialogComponent;
  let fixture: ComponentFixture<TransferPatientDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferPatientDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferPatientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
