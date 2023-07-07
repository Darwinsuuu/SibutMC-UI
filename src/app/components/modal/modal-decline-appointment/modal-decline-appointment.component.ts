import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-decline-appointment',
  templateUrl: './modal-decline-appointment.component.html',
  styleUrls: ['./modal-decline-appointment.component.scss']
})
export class ModalDeclineAppointmentComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  reason: string = "";

}
