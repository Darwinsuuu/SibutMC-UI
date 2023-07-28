import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AppointmentService } from 'src/app/_services/appointment/appointment.service';
import { EmployeeService } from 'src/app/_services/employee/employee.service';

@Component({
  selector: 'app-modal-approve-appointment',
  templateUrl: './modal-approve-appointment.component.html',
  styleUrls: ['./modal-approve-appointment.component.scss']
})
export class ModalApproveAppointmentComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ModalApproveAppointmentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder:FormBuilder,
              private employeeService: EmployeeService,
              private appointmentService: AppointmentService) { }


  formData: FormGroup = this.formBuilder.group({
    appointmentId: [this.data.appointmentId, Validators.required],
    time: ["", Validators.required],
    physician: ["", Validators.required]
  })

  physicianList: any[] = [];


  ngOnInit(): void {
    this.employeeList();
  }

  
  approveAppointment(data: any) {

    if(this.formData.valid) {
      const result = this.appointmentService.approveAppointment(data);
      this.dialogRef.close(data);
    } else {
      alert('error')
    }


  }



  async employeeList() {
    const response = await this.employeeService.getAllEmployees();
    this.physicianList = response.result;
    console.log(this.physicianList)
  }


}
