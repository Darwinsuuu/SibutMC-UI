import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/_services/user/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medical-info',
  templateUrl: './medical-info.component.html',
  styleUrls: ['./medical-info.component.scss']
})

export class MedicalInfoComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private userService: UserServiceService) {

  }

  @Input() fetchedMedicalInfo: any = {};

  ngOnInit(): void {
    setTimeout(() => {
      // contact information
      this.medicalInfo.get('user_id')?.setValue(this.fetchedMedicalInfo.user_id);
      this.medicalInfo.get('height')?.setValue(this.fetchedMedicalInfo.height === 0 ? '' : this.fetchedMedicalInfo.height);
      this.medicalInfo.get('weight')?.setValue(this.fetchedMedicalInfo.weight === 0 ? '' : this.fetchedMedicalInfo.weight);
      this.medicalInfo.get('blood_type')?.setValue(this.fetchedMedicalInfo.blood_type);
      this.medicalInfo.get('blood_pressure')?.setValue(this.fetchedMedicalInfo.blood_pressure);
      this.medicalInfo.get('disability')?.setValue(this.fetchedMedicalInfo.disability);
      this.medicalInfo.get('contigious_disease')?.setValue(this.fetchedMedicalInfo.contigious_disease);

    }, 1000);
  }

  medicalInfo: FormGroup = this.formBuilder.group({
    user_id: ["", Validators.required],
    height: ["", [Validators.required, Validators.pattern(/^-?\d*[.,]?\d{0,2}$/)]],
    weight: ["", [Validators.required, Validators.pattern(/^-?\d*[.,]?\d{0,2}$/)]],
    blood_type: ["", Validators.required],
    blood_pressure: ["", Validators.required],
    disability: [""],
    contigious_disease: [""],
  })


  async updateMedicalInfo(medicalInfo: FormGroup) {
      if(this.medicalInfo.valid) {
        console.log(medicalInfo)
        const result = await this.userService.updateMedicalInfo(medicalInfo)
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
