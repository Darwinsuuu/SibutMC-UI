import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeInsert } from 'src/app/_models/EmployeeModel';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent {

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar) {

  }
  
  @ViewChild('myForm') myForm: NgForm | undefined;

  employeeCredentials: FormGroup = this.formBuilder.group({
    firstname: ["", [Validators.required, Validators.pattern(/^[A-Za-z -]+$/)]],
    middlename: ["", [Validators.pattern(/^[A-Za-z -]+$/)]],
    lastname: ["", [Validators.required, Validators.pattern(/^[A-Za-z -]+$/)]],
    position: ["", [Validators.required]],
    username: ["", [Validators.required,  Validators.minLength(6), Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/)],],
    password: ["", [Validators.required, Validators.minLength(6)]]
  })

  isPasswordVisible: boolean = false;


  showPassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }



  submitEmployeeCredentials(credentials: EmployeeInsert) {
    
    if(this.employeeCredentials.valid) {
      console.log(credentials)

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


}
