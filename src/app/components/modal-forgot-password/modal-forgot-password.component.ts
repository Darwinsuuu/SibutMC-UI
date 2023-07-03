import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
@Component({

  selector: 'app-modal-forgot-password',
  templateUrl: './modal-forgot-password.component.html',
  styleUrls: ['./modal-forgot-password.component.scss']
})
export class ModalForgotPasswordComponent {

  constructor(private dialog:MatDialog,
              private formBuilder:FormBuilder) { }

  
  credential: FormGroup = this.formBuilder.group({
    contact_no: ["", [Validators.required, Validators.pattern(/^(09|\+639)\d{9}$/)]]
  })

  passwordCredentials: FormGroup = this.formBuilder.group({
    user_id: ["", Validators.required],
    password: ["", [Validators.required, Validators.minLength(6)]]
  })

  isPasswordVisible: boolean = false;
  OTPCodes: string = '';
  validOTPCode: string = Math.floor(100000 + Math.random() * 900000).toString();
  btnOTPSend: string = "Send OTP";
  isbtnDisabled: boolean = false;

  showPassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }


  OTPCodeValid() {
    if (this.OTPCodes === this.validOTPCode) {
      this.passwordCredentials.get('user_id')?.setValue('5');
      return true;
    }
    return false;
  }


  sendOTPCode() {
    if(this.credential.valid) {
      this.validOTPCode = Math.floor(100000 + Math.random() * 900000).toString();
      alert('This is temporary! OTP: ' + this.validOTPCode);
      
      this.startCountdown();

      // api call here
    }

  }


  startCountdown() {
    let counter = 180;
    this.isbtnDisabled = true;

    const interval = setInterval(() => {
      this.btnOTPSend = counter.toString() + "s";
      counter--;
        
      if (counter < 0 ) {
        clearInterval(interval);
        this.btnOTPSend = "Send OTP";
        this.isbtnDisabled = false;
      }
    }, 1000);
  }

  submitCredentials(credentials: FormGroup) {
    let data = credentials;

    // api call here
  }

}
