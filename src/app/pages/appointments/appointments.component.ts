import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(private auth: AuthService,
              private dialog: MatDialog,
              private appointmentService: AppointmentService) {

  }

  ngOnInit(): void {
    this.getAllAppointmentLists()
  }


  toggleNewAppointmentForm() {
    this.dialog.open(ModalNewAppointmentComponent, {
      data: {userId: this.auth.userId},
      width: 'fit-content',
      enterAnimationDuration: 500,
      exitAnimationDuration: 500,
    }).afterClosed().subscribe(async (res: any) => {

      if(res) {
        // api call here
        const result = await this.appointmentService.createNewAppointment(res);

        if (result.success) {
          Swal.fire({
            title: 'Success',
            text: result.message,
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.isLoading = true;
              this.getAllAppointmentLists();
            }
          });
        }
      }

    })

  }


  
  async getAllAppointmentLists() {

    const response = await this.appointmentService.getAllAppointments();
    if(response.success) {
      this.allAppointmentList = response.result
      setTimeout(() => {
        this.isLoading = false;
      }, 1500)
    }

  }


  onTabChange(event: any ) {
    this.getAllAppointmentLists();
  }

}
