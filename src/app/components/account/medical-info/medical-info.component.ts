import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-medical-info',
  templateUrl: './medical-info.component.html',
  styleUrls: ['./medical-info.component.scss']
})
export class MedicalInfoComponent {

  constructor(private formBuilder: FormBuilder) {

  }

  medicalInfo: FormGroup = this.formBuilder.group({
    height: ["", Validators.required],
    weight: ["", Validators.required],
    blood_type: ["", Validators.required],
    blood_pressure: ["", Validators.required],
    disability: [""],
    contigious_disease: [""],
  })


  updateMedicalInfo(medicalInfo: FormGroup) {
      if(this.medicalInfo.valid) {
        console.log(medicalInfo)
        // api call here
      }
  }

}
