import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SmsServiceService } from 'src/app/_services/semaphore/sms-service.service';
import { UserServiceService } from 'src/app/_services/user/user-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({

  selector: 'app-modal-forgot-password',
  templateUrl: './modal-forgot-password.component.html',
  styleUrls: ['./modal-forgot-password.component.scss']
})
export class ModalForgotPasswordComponent {

  constructor(private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private smsService: SmsServiceService,
    private userService: UserServiceService,
    private router: Router,
    private dialogRef: MatDialogRef<ModalForgotPasswordComponent>) { }


  credential: FormGroup = this.formBuilder.group({
    contact_no: ["", [Validators.required, Validators.pattern(/^(09|\+639)\d{9}$/)]]
  })

  passwordCredentials: FormGroup = this.formBuilder.group({
    user_id: ["", Validators.required],
    password: ["", [Validators.required, Validators.minLength(6)]]
  })

  isPasswordVisible: boolean = false;
  validOTPCode: string = Math.floor(100000 + Math.random() * 900000).toString();
  OTPCodes: string = '';
  btnOTPSend: string = "Send OTP";
  isbtnDisabled: boolean = false;

  showPassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }


  OTPCodeValid() {
    if (this.OTPCodes === this.validOTPCode) {
      return true;
    }
    return false;
  }


  async checkContact() {

    try {
      if(this.credential.valid) {
        const response = await this.userService.getUserInfoByContact(this.credential.get('contact_no')?.getRawValue().replace(/^(\+63|0)?(\d+)/, '$2'));
        console.log(response)
        if (response.length != 0) {
          this.passwordCredentials.get('user_id')?.setValue(response[0].user_id);
          this.sendOTPCode();
        } else {
          Swal.fire({
            title: 'Invalid',
            text: 'Phone number is not valid',
            icon: 'error',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
  
            }
          });
        }

      }

    } catch (error: any) {

    }


  }


  async sendOTPCode() {
    try {
      if (this.credential.valid) {
        this.validOTPCode = Math.floor(100000 + Math.random() * 900000).toString();
        this.startCountdown();

        // api call here
        const result: any = await this.smsService.sendOTPCreateAccount({ otp: this.validOTPCode, contact_no: this.credential.get('contact_no')?.getRawValue() })
      }
    } catch (error: any) {

    }

  }


  startCountdown() {
    let counter = 180;
    this.isbtnDisabled = true;

    const interval = setInterval(() => {
      this.btnOTPSend = counter.toString() + "s";
      counter--;

      if (counter < 0) {
        clearInterval(interval);
        this.btnOTPSend = "Send OTP";
        this.isbtnDisabled = false;
      }
    }, 1000);
  }

  async submitCredentials(credentials: FormGroup) {
    // api call here
    if(this.passwordCredentials.valid) {
      console.log(this.passwordCredentials?.getRawValue())
      const result = await this.userService.getUserUpdatePassword(credentials);
      console.log(result)
      if(result.success) {
        Swal.fire({
          title: 'Success',
          text: 'Password is successfully updated',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.dialogRef.close(true);
          }
        });
      }
    }
  }

}
