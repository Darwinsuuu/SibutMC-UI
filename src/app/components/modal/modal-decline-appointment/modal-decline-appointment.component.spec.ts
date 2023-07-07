import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeclineAppointmentComponent } from './modal-decline-appointment.component';

describe('ModalDeclineAppointmentComponent', () => {
  let component: ModalDeclineAppointmentComponent;
  let fixture: ComponentFixture<ModalDeclineAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDeclineAppointmentComponent]
    });
    fixture = TestBed.createComponent(ModalDeclineAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
