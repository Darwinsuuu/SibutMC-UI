import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-approve-appointment',
  templateUrl: './modal-approve-appointment.component.html',
  styleUrls: ['./modal-approve-appointment.component.scss']
})
export class ModalApproveAppointmentComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder:FormBuilder) { }


  formData: FormGroup = this.formBuilder.group({
    appointmentId: [this.data.appointmentId, Validators.required],
    time: ["", Validators.required],
    physician: ["", Validators.required]
  })


}
