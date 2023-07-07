import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-archive-employee',
  templateUrl: './modal-archive-employee.component.html',
  styleUrls: ['./modal-archive-employee.component.scss']
})
export class ModalArchiveEmployeeComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  
}
