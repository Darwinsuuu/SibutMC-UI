import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/_services/user/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss']
})

export class AdditionalInfoComponent implements OnInit {


  @Input() fetchedContactInfo: any = {};
  @Input() fetchedEmergencyContact: any = {};

  constructor(private formBuilder: FormBuilder,
              private userService: UserServiceService) {

  }


  ngOnInit(): void {
    setTimeout(() => {
      // contact information
      this.contactInfo.get('user_id')?.setValue(this.fetchedContactInfo.user_id);
      this.contactInfo.get('contact_no')?.setValue(this.fetchedContactInfo.contact_no);
      this.contactInfo.get('email')?.setValue(this.fetchedContactInfo.email);
      this.contactInfo.get('address')?.setValue(this.fetchedContactInfo.address);

      // emergency contact information
      this.emergencyContactInfo.get('user_id')?.setValue(this.fetchedEmergencyContact.user_id);
      this.emergencyContactInfo.get('fullname')?.setValue(this.fetchedEmergencyContact.contact_fullname);
      this.emergencyContactInfo.get('emergency_contact_no')?.setValue(this.fetchedEmergencyContact.emegency_contact_no);
    }, 1000);
  }

  contactInfo: FormGroup = this.formBuilder.group({
    user_id: ["", [Validators.required]],
    contact_no: ["", [Validators.required, Validators.pattern(/^(09|\+639)\d{9}$/)]],
    email: ["", [Validators.required, Validators.email]],
    address: ["", [Validators.required]]
  })

  emergencyContactInfo: FormGroup = this.formBuilder.group({
    user_id: ["", [Validators.required]],
    fullname: ["", [Validators.required, Validators.pattern(/^[A-Za-z -]+$/)]],
    emergency_contact_no: ["", [Validators.required, Validators.pattern(/^(09|\+639)\d{9}$/)]],
  })


  async updateContactInfo(contactInfo: FormGroup) {
    if (this.contactInfo.valid) {
      // api call here
      const result = await this.userService.updateContactInfo(contactInfo)
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


  async updateEmergencyInfo(emergencyContactInfo: FormGroup) {
    if (this.emergencyContactInfo.valid) {
      // api call here
      const result = await this.userService.updateEmegencyContactInfo(emergencyContactInfo)
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
