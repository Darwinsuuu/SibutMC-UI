import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclinedAppointmentsComponent } from './declined-appointments.component';

describe('DeclinedAppointmentsComponent', () => {
  let component: DeclinedAppointmentsComponent;
  let fixture: ComponentFixture<DeclinedAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeclinedAppointmentsComponent]
    });
    fixture = TestBed.createComponent(DeclinedAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
