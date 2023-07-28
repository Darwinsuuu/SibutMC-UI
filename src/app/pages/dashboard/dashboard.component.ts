import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DashboardService } from 'src/app/_services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  pageTitle: string = "Dashboard";

  constructor(private titleService: Title,
              private dashboardService: DashboardService) {
    this.titleService.setTitle("Sibut Medicare | Dashboard");
  }

  totalPatients: number = 0;
  totalStaff: number = 0;
  avgPatientPerDay: number = 0;
  appointmentsToday: number = 0;
  missedAppointments: number = 0;
  



  ngOnInit(): void {
    this.getDashboardData()
  }



  async getDashboardData() {

    const response = await this.dashboardService.getDashboard();
    console.log(response)
    this.totalPatients = response.result.totalPatient
    this.totalStaff = response.result.totalStaff
    this.avgPatientPerDay = response.result.avgAppointmentPerDay
    this.appointmentsToday = response.result.appointmentToday
    this.missedAppointments = response.result.missedAppointment

  }



}
