import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingAppointmentsComponent } from './pending-appointments.component';

describe('PendingAppointmentsComponent', () => {
  let component: PendingAppointmentsComponent;
  let fixture: ComponentFixture<PendingAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingAppointmentsComponent]
    });
    fixture = TestBed.createComponent(PendingAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
