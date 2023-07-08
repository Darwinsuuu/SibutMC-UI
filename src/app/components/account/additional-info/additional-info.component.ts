import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss']
})
export class AdditionalInfoComponent {


  constructor(private formBuilder: FormBuilder) {

  }

  contactInfo: FormGroup = this.formBuilder.group({
    contact_no: ["", [Validators.required, Validators.pattern(/^(09|\+639)\d{9}$/)]],
    email: ["", [Validators.required, Validators.email]],
    address: ["", [Validators.required]]
  })

  emergencyContactInfo: FormGroup = this.formBuilder.group({
    fullname: ["", [Validators.required, Validators.pattern(/^[A-Za-z -]+$/)]],
    emergency_contact_no: ["", [Validators.required, Validators.pattern(/^(09|\+639)\d{9}$/)]],
  })


  updateContactInfo(contactInfo: FormGroup) {
    if(this.contactInfo.valid) {
      console.log(contactInfo)
      // api call here

    }
  }


  updateEmergencyInfo(emergencyContactInfo: FormGroup) {
    if(this.emergencyContactInfo.valid) {
      console.log(emergencyContactInfo)
      // api call here
      
    }
  }


}
