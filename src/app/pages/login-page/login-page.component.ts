import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ModalTermsConditionsComponent } from 'src/app/components/modal-terms-conditions/modal-terms-conditions.component';
import { ModalForgotPasswordComponent } from 'src/app/components/modal-forgot-password/modal-forgot-password.component';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor(private titleService:Title,
              private formBuilder:FormBuilder,
              private dialog: MatDialog) {
    this.titleService.setTitle("Sibut Medicare | Login");
  }

  isPasswordVisible: boolean = false;
  
  loginCredentials = this.formBuilder.group({
    username: [''],
    password: [''],
  });


  showPassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  openTermsConditionsDialog() {
    this.dialog.open(ModalTermsConditionsComponent, {
      width: 'fit-content',
      enterAnimationDuration: 500,
      exitAnimationDuration: 500,
    });
  }

  openForgotPasswordDialog() {
    this.dialog.open(ModalForgotPasswordComponent, {
      width: '100%',
      maxWidth: '520px',
      enterAnimationDuration: 500,
      exitAnimationDuration: 500,
    });
  }

  submitLoginCredentials(credentials: FormGroup) {
    let data = credentials;

    // api call here
  }

}
