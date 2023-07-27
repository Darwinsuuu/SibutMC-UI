import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { GetAllAppointmentLists } from 'src/app/_models/AppointmentModel';
import { AppointmentService } from 'src/app/_services/appointment/appointment.service';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { ModalNewAppointmentComponent } from 'src/app/components/modal/modal-new-appointment/modal-new-appointment.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})

export class AppointmentsComponent implements OnInit {

  pageTitle: string = "Appointments";

  allAppointmentList: GetAllAppointmentLists[] = [];

  isLoading: boolean = true;

  constructor(private titleService: Title,
              public auth: AuthService,
              private dialog: MatDialog,
              private appointmentService: AppointmentService) {
        this.titleService.setTitle("Sibut Medicare | Appointments");
  }

  ngOnInit(): void {
    this.getAllAppointmentsByPatient()
    console.log(this.auth.getUserType())
  }


  toggleNewAppointmentForm() {
    this.dialog.open(ModalNewAppointmentComponent, {
      data: {userId: localStorage.getItem('User_ID')},
      width: 'fit-content',
      enterAnimationDuration: 500,
      exitAnimationDuration: 500,
    }).afterClosed().subscribe(async (res: any) => {

      if(res) {
        // api call here
        this.isLoading = true;
        const result = await this.appointmentService.createNewAppointment(res);
        if(result) {
          if (result.success) {
            Swal.fire({
              title: 'Success',
              text: result.message,
              icon: 'success',
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                this.getAllAppointmentsByPatient();
              }
            });
          }
        }
      }

    })

  }


  
  async getAllAppointmentsByPatient() {

    const userType = this.auth.getUserType();
    var response;
    if(userType == '3') {
      response = await this.appointmentService.getAllAppointmentsByPatient();
    } else {
      response =  await this.appointmentService.getAllAppointments();
    }

    if(response.success) {
      this.allAppointmentList = response.result
      setTimeout(() => {
        this.isLoading = false;
      }, 1500)
    }

  }

  onTabChange(event: any ) {
    this.getAllAppointmentsByPatient();
  }

}
