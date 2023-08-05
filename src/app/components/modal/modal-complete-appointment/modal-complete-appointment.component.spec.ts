import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCompleteAppointmentComponent } from './modal-complete-appointment.component';

describe('ModalCompleteAppointmentComponent', () => {
  let component: ModalCompleteAppointmentComponent;
  let fixture: ComponentFixture<ModalCompleteAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCompleteAppointmentComponent]
    });
    fixture = TestBed.createComponent(ModalCompleteAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
