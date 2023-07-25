import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { UserServiceService } from 'src/app/_services/user/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})

export class AccountSettingsComponent implements OnInit {

  pageTitle: string = "Account Settings";
  accountInformation: any = {};
  isLoading: boolean = true;


  constructor(private titleService: Title, 
              private auth: AuthService,
              private userService: UserServiceService,
              private router: Router) {

      this.titleService.setTitle("Sibut Medicare | Account Settings");
  }


  ngOnInit(): void {
    this.getPatientInfo();
  }




  async getPatientInfo() {

    try {
      const response = await this.userService.userInformation();
      console.log(response)
      if (!response.success) {
        Swal.fire({
          title: "Something went wrong!",
          text: response.message,
          icon: 'error',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {

          }
        });

        return false;

      }

      this.accountInformation = response.result;

      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
      
      return true;

    } catch (error: any) {

      Swal.fire({
        title: error.message,
        text: error.error,
        icon: 'error',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          // Code to execute if the user confirms the alert
        }
      });

      return false;
    }

  }


}
