import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeUpdate } from 'src/app/_models/EmployeeModel';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/_services/employee/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-edit-employee',
  templateUrl: './modal-edit-employee.component.html',
  styleUrls: ['./modal-edit-employee.component.scss']
})

export class ModalEditEmployeeComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ModalEditEmployeeComponent>,
              private formBuilder: FormBuilder,
              private employeeService: EmployeeService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  employeeCredentials: FormGroup = this.formBuilder.group({
    id: [this.data.credentials?.id, [Validators.required]],
    firstname: [this.data.credentials?.firstname, [Validators.required, Validators.pattern(/^[A-Za-z -]+$/)]],
    middlename: [this.data.credentials?.middlename, [Validators.pattern(/^[A-Za-z -]+$/)]],
    lastname: [this.data.credentials?.lastname, [Validators.required, Validators.pattern(/^[A-Za-z -]+$/)]],
    position: [this.data.credentials?.position, [Validators.required]]
  })

  isPasswordVisible: boolean = false;


  ngOnInit(): void {
    console.log(this.data.credentials)
  }

  showPassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }


  async editEmployeeCredentials(credentials: EmployeeUpdate) {

    if (this.employeeCredentials.valid) {
      console.log(credentials)

      const result = await this.employeeService.updateEmployeeInfo(credentials)
      if (result.success) {
        Swal.fire({
          title: "Success",
          text: result.message,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.dialogRef.close(true);
          }
        });
      }

    }

  }


}
