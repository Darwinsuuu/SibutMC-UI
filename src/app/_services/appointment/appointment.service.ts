import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewAppointment } from 'src/app/_models/AppointmentModel';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AppointmentService {

  constructor(private http: HttpClient,
              private auth: AuthService) { }

  async createNewAppointment(appointmentInfo: NewAppointment): Promise<any> {

    try {
      const url = environment.apiUrl + 'api/appointment/createAppointment';
      const response = await this.http.post<any>(url, appointmentInfo).toPromise();
      return response;

    } catch (error: any) {

      if (error.status === 500) {
        console.error('An internal server error occurred. Please try again later. ');
        console.error(error)
      } else {
        console.error('An error occurred. Please try again. ');
        console.error(error)
      }
      throw error.error;

    }

  }


  async getAllAppointments() {

    try {
      
      const url = environment.apiUrl + 'api/appointment/getAllAppointments/' + this.auth.userId;
      const result = await this.http.get<any>(url).toPromise();
      return result;

    } catch(error) {

    }

  }

}
