import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EmployeeService } from 'src/app/_services/employee/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  pageTitle: string = "Employees";

  employeeList: any[] = [];
  isLoading: boolean = true;

  constructor(private titleService: Title,
              private employeeService: EmployeeService) {
    this.titleService.setTitle("Sibut Medicare | Employees");
  }

  ngOnInit(): void {
    this.getEmployees();
  }
  
  async getEmployees() {
  
    const response = await this.employeeService.getAllEmployees();
    
    if(response.success) {
      this.employeeList = response.result
      setTimeout(() => {
        this.isLoading = false;
      }, 1500)
    }

  }


  
  onTabChange(event: any ) {
    this.getEmployees();
  }

}
