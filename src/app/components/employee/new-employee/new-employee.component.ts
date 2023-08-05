import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeInsert } from 'src/app/_models/EmployeeModel';
import { EmployeeService } from '../../../_services/employee/employee.service';
import Swal from 'sweetalert2'; 
import { AuthService } from 'src/app/_services/auth/auth.service';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent {

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private employeeService: EmployeeService,
              private auth: AuthService) {

  }
  
  @ViewChild('myForm') myForm: NgForm | undefined;

  employeeCredentials: FormGroup = this.formBuilder.group({
    userRole: [this.auth.getUserRole(), [Validators.required]],
    firstname: ["", [Validators.required, Validators.pattern(/^[A-Za-z -]+$/)]],
    middlename: ["", [Validators.pattern(/^[A-Za-z -]+$/)]],
    lastname: ["", [Validators.required, Validators.pattern(/^[A-Za-z -]+$/)]],
    position: ["", [Validators.required]]
  })

  isPasswordVisible: boolean = false;


  showPassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }



  async submitEmployeeCredentials(credentials: EmployeeInsert) {
    
    try {

      if(this.employeeCredentials.valid) {
  
        const response = await this.employeeService.createNewEmployee(credentials);

        if(response.success) {
          // api call here
          this.snackBar.open("Account was successfully created!", "", {
            duration: 3000,
            verticalPosition: "top",
            panelClass: "success-snackbar"
          });
    
          this.employeeCredentials.reset();
          this.myForm!.resetForm();
        }
      }
      
    } catch(error) {

    }

  }


}
