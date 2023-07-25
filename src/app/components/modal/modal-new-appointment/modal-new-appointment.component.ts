import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DateValidator } from './date-validator';
import { AuthService } from 'src/app/_services/auth/auth.service';

@Component({
  selector: 'app-modal-new-appointment',
  templateUrl: './modal-new-appointment.component.html',
  styleUrls: ['./modal-new-appointment.component.scss']
})

export class ModalNewAppointmentComponent {

  constructor(private dialogRef: MatDialogRef<ModalNewAppointmentComponent>,
              private formBuilder: FormBuilder,
              private auth: AuthService) {

  }

  appointmentData: FormGroup = this.formBuilder.group({
    user_id: [localStorage.getItem('User_ID'), Validators.required],
    appointment_date: ["", [Validators.required, DateValidator.cannotBePastDate]],
    medical_reason: ["", [Validators.required]],
    medical_description: ["", [Validators.required]],
  })


  getMedicalReasonLength() {
    return 25 - this.appointmentData.get('medical_reason')?.getRawValue().length;
  }


  submitNewAppointment(appointment: FormGroup) {
    if(this.appointmentData.valid) {
      this.dialogRef.close(appointment);
    }
  }

}
