import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSignupOtpComponent } from './modal-signup-otp.component';

describe('ModalSignupOtpComponent', () => {
  let component: ModalSignupOtpComponent;
  let fixture: ComponentFixture<ModalSignupOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSignupOtpComponent]
    });
    fixture = TestBed.createComponent(ModalSignupOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
