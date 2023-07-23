import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { UserServiceService } from 'src/app/_services/user/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})

export class PersonalInfoComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private userService: UserServiceService,
    private router: Router) {
  }

  @Input() fetchedPersonalInfo: any = {};
  @Input() fetchedAccountInfo: any = {};


  personalInfo: FormGroup = this.formBuilder.group({
    user_id: ["", [Validators.required]],
    firstname: ["", [Validators.required, Validators.pattern(/^[A-Za-z -]+$/)]],
    middlename: ["", [Validators.pattern(/^[A-Za-z -]+$/)]],
    lastname: ["", [Validators.required, Validators.pattern(/^[A-Za-z -]+$/)]],
    gender: ["", [Validators.required]],
    birthdate: ["", [Validators.required]],
    marital_status: ["", [Validators.required]]
  })

  accountInfo: FormGroup = this.formBuilder.group({
    user_id: ["", [Validators.required]],
    username: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/)]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  })


  isPasswordVisible: boolean = false;

  ngOnInit(): void {
    setTimeout(() => {

      // personal information
      this.personalInfo.get('user_id')?.setValue(this.fetchedPersonalInfo.user_id);
      this.personalInfo.get('firstname')?.setValue(this.fetchedPersonalInfo.firstname);
      this.personalInfo.get('middlename')?.setValue(this.fetchedPersonalInfo.middlename);
      this.personalInfo.get('lastname')?.setValue(this.fetchedPersonalInfo.lastname);
      this.personalInfo.get('gender')?.setValue(this.fetchedPersonalInfo.gender);
      this.personalInfo.get('birthdate')?.setValue(this.fetchedPersonalInfo.birthdate);
      this.personalInfo.get('marital_status')?.setValue(this.fetchedPersonalInfo.marital_status);

      // account information
      this.accountInfo.get('user_id')?.setValue(this.fetchedPersonalInfo.user_id);
      this.accountInfo.get('username')?.setValue(this.fetchedAccountInfo.username);
      this.accountInfo.get('password')?.setValue(this.fetchedAccountInfo.password);

    }, 1000);
  }

  showPassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }


  async updatePersonalInfo(personalInfo: FormGroup) {
    if (this.personalInfo.valid) {
      // api call here
      const result = await this.userService.updatePersonalInfo(personalInfo)
      if (result.success) {
        Swal.fire({
          title: "Success",
          text: result.message,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            // Code to execute if the user confirms the alert
          }
        });
      }
    }
  }

  async updateAccountInfo(accountInfo: FormGroup) {
    if (this.accountInfo.valid) {
      // api call here
      const result = await this.userService.updateAccountInfo(accountInfo)
      if (result.success) {
        Swal.fire({
          title: "Success",
          text: result.message,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            // Code to execute if the user confirms the alert
          }
        });
      }

    }
  }



}
