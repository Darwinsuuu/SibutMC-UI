import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ModalSignupOtpComponent } from 'src/app/components/modal/modal-signup-otp/modal-signup-otp.component';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { SmsServiceService } from 'src/app/_services/semaphore/sms-service.service';
import { UserServiceService } from 'src/app/_services/user/user-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent {

  constructor(private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private smsService: SmsServiceService,
    private userService: UserServiceService) { }

  personalInfo: FormGroup = this.formBuilder.group({
    firstname: ["", [Validators.required, Validators.pattern(/^[A-Za-z -]+$/)]],
    middlename: ["", [Validators.pattern(/^[A-Za-z -]+$/)]],
    lastname: ["", [Validators.required, Validators.pattern(/^[A-Za-z -]+$/)]],
    gender: ["", [Validators.required]],
    birthdate: ["", [Validators.required]],
    marital_status: ["", [Validators.required]]
  })

  contactInfo: FormGroup = this.formBuilder.group({
    contact_no: ["", [Validators.required, Validators.pattern(/^(09|\+639)\d{9}$/)]],
    email: ["", [Validators.required, Validators.email]],
    address: ["", [Validators.required]]
  })

  emergencyContactInfo: FormGroup = this.formBuilder.group({
    fullname: ["", [Validators.required, Validators.pattern(/^[A-Za-z -]+$/)]],
    emergency_contact_no: ["", [Validators.required, Validators.pattern(/^(09|\+639)\d{9}$/)]],
  })

  accountInfo: FormGroup = this.formBuilder.group({
    username: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/)]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  })



  isPasswordVisible: boolean = false;

  showPassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }



  getAccountCredentials() {
    if (this.personalInfo.valid && this.contactInfo.valid && this.emergencyContactInfo.valid && this.accountInfo.valid) {
      let otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      this.sendOTPMessageServer(otpCode)
    }
  }


  async sendOTPMessageServer(otpCode: string) {
    try {
      const credentails = {
        contact_no: this.contactInfo.controls['contact_no'].value,
        otp: otpCode
      }
      const result: any = await this.smsService.sendOTPCreateAccount(credentails);
      if (result.success === true) {
        this.openOTPVerificationDialog(otpCode);
      }
    } catch (error) {
      console.log(error)
    }
  }


  openOTPVerificationDialog(otp: string) {
    this.dialog.open(ModalSignupOtpComponent, {
      data: {
        contact_no: this.contactInfo.controls['contact_no'].value,
        otpCode: otp
      },
      width: 'fit-content',
      disableClose: true,
      enterAnimationDuration: 500,
      exitAnimationDuration: 500,
    }).afterClosed().subscribe(res => {
      if (res) {
        // api call here
        this.submitCrednetialsServer();
      }
    });
  }


  async submitCrednetialsServer() {
    const allInfo = {
      personalInfo: this.personalInfo.value,
      contactInfo: this.contactInfo.value,
      emergencyContactInfo: this.emergencyContactInfo.value,
      accountInfo: this.accountInfo.value
    };

    try {
      const response = await this.userService.createNewPatient(allInfo);
      // Handle the response
      console.log(response);

      Swal.fire({
        title: 'Success',
        text: response.message,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });

    } catch (error: any) {
      // Handle the error
      console.error(error);

      Swal.fire({
        title: error.message,
        text: error.error + ": Username '" + this.accountInfo.get('username')!.value + "' is already taken.",
        icon: 'error',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          // Code to execute if the user confirms the alert
        }
      });
    }
  }

}
