import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor(private titleService:Title,
              private formBuilder:FormBuilder) {
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


  submitLoginCredentials(credentials: FormGroup) {
    let data = credentials;

    // api call here
  }

}
