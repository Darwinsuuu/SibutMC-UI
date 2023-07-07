import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ModalTermsConditionsComponent } from 'src/app/components/modal/modal-terms-conditions/modal-terms-conditions.component';
import { ModalForgotPasswordComponent } from 'src/app/components/modal/modal-forgot-password/modal-forgot-password.component';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/_models/UserModel';
import { AuthService } from 'src/app/_services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private titleService:Title,
              private formBuilder:FormBuilder,
              private dialog:MatDialog,
              private route:Router,
              private auth:AuthService) {
    this.titleService.setTitle("Sibut Medicare | Login");
  }

  
  ngOnInit(): void {
    if(this.auth.isAuth) {
      this.route.navigate(['/dashboard']);
    }
  }

  
  loginCredentials: FormGroup = this.formBuilder.group({
    username: [''],
    password: [''],
  });

  isPasswordVisible: boolean = false;
  validCredentials: boolean = true;


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

  submitLoginCredentials(credentials: UserLogin) {

    this.validCredentials = false;

    // api call here
    if(credentials.username == 'admin' && credentials.password == 'admin') {
      this.auth.isAuth = true;
      this.validCredentials = true;
      this.route.navigate(['/dashboard'])
    }

  }

}
