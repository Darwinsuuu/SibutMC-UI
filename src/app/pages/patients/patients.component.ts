import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent {

  pageTitle: string = "Patients";

  constructor(private titleService: Title) {
    this.titleService.setTitle("Sibut Medicare | Patients");
  }

}
