import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ModalSignupOtpComponent } from 'src/app/components/modal-signup-otp/modal-signup-otp.component';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent {

  constructor(private formBuilder: FormBuilder,
              private dialog: MatDialog) {}

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
      this.openOTPVerificationDialog()
    }

  }


  openOTPVerificationDialog() {
    this.dialog.open(ModalSignupOtpComponent, {
      data: {
        contact_no: this.contactInfo.controls['contact_no'].value
      },
      width: 'fit-content',
      disableClose: true,
      enterAnimationDuration: 500,
      exitAnimationDuration: 500,
    });
  }

}
