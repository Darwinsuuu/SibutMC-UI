import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ModalTermsConditionsComponent } from 'src/app/components/modal/modal-terms-conditions/modal-terms-conditions.component';
import { ModalForgotPasswordComponent } from 'src/app/components/modal/modal-forgot-password/modal-forgot-password.component';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { UserLogin } from 'src/app/_models/UserModel';
import { AuthService } from 'src/app/_services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, AfterContentInit {

  constructor(private titleService: Title,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private route: Router,
    private auth: AuthService,
    private activeRoute: ActivatedRoute) {
    this.titleService.setTitle("Sibut Medicare | Login");
  }

  ngOnInit(): void {
    const userType = localStorage.getItem('User_Type');
    if(userType) {

      if(userType === '3') {
        this.route.navigate(["/appointment"]);
      }

    }
  }


  ngAfterContentInit(): void {
    
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

  async submitLoginCredentials(credentials: UserLogin) {

    // api call here
    try {

      const authPath = this.loginURL;
      const result = await this.auth.login(credentials, authPath);

      if (result.success === true) {
        console.log(result)
        this.validCredentials = true;
        if(result.userType == 3) {
          this.route.navigate(['/appointment'])
        } else {
          this.route.navigate(['/dashboard'])
        }
      } else {
        this.validCredentials = false;
      }

    } catch (error) {
      this.validCredentials = false;
    }

  }


  get loginURL() {

    const url = window.location.href;
    const parts = url.split("/");
    const loginURL = parts[parts.length - 1];

    return loginURL === 'admin' ? 'adminAuthentication' :
      loginURL === 'staff' ? 'staffAuthentication' :
        'patientAuthentication'
  }

}
