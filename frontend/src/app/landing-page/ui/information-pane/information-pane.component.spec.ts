import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationPaneComponent } from './information-pane.component';

describe('InformationPaneComponent', () => {
  let component: InformationPaneComponent;
  let fixture: ComponentFixture<InformationPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationPaneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
