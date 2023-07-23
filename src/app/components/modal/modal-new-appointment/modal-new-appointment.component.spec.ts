import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewAppointmentComponent } from './modal-new-appointment.component';

describe('ModalNewAppointmentComponent', () => {
  let component: ModalNewAppointmentComponent;
  let fixture: ComponentFixture<ModalNewAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalNewAppointmentComponent]
    });
    fixture = TestBed.createComponent(ModalNewAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
