import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {

  pageTitle: string = "Employees";

  constructor(private titleService: Title) {
    this.titleService.setTitle("Sibut Medicare | Employees");
  }

}
