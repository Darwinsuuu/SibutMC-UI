import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  pageTitle: string = "Dashboard";

  constructor(private titleService: Title) {
    this.titleService.setTitle("Sibut Medicare | Dashboard");
  }

}
