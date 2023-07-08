import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {

  }

  personalInfo: FormGroup = this.formBuilder.group({
    firstname: ["", [Validators.required, Validators.pattern(/^[A-Za-z -]+$/)]],
    middlename: ["", [Validators.pattern(/^[A-Za-z -]+$/)]],
    lastname: ["", [Validators.required, Validators.pattern(/^[A-Za-z -]+$/)]],
    gender: ["", [Validators.required]],
    birthdate: ["", [Validators.required]],
    marital_status: ["", [Validators.required]]
  })
  
  accountInfo: FormGroup = this.formBuilder.group({
    username: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/)]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  })


  isPasswordVisible: boolean = false;

  ngOnInit(): void {

  }


  showPassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }


  updatePersonalInfo(personalInfo: FormGroup) {
    if(this.personalInfo.valid) {
      console.log(personalInfo)
      // api call here
      
    }
  }

  updateAccountInfo(accountInfo: FormGroup) {
    if (this.accountInfo.valid) {
      console.log(accountInfo)
      // api call here

    }
  }



}
