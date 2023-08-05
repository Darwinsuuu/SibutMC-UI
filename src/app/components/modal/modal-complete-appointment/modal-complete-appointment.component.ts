import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-complete-appointment',
  templateUrl: './modal-complete-appointment.component.html',
  styleUrls: ['./modal-complete-appointment.component.scss']
})
export class ModalCompleteAppointmentComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  diagnosis: string = "";

}
