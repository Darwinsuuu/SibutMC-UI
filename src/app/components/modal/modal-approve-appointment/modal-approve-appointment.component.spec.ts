import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalApproveAppointmentComponent } from './modal-approve-appointment.component';

describe('ModalApproveAppointmentComponent', () => {
  let component: ModalApproveAppointmentComponent;
  let fixture: ComponentFixture<ModalApproveAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalApproveAppointmentComponent]
    });
    fixture = TestBed.createComponent(ModalApproveAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
