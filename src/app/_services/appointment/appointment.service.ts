import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewAppointment } from 'src/app/_models/AppointmentModel';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { httpHeader } from '../header';

@Injectable({
  providedIn: 'root'
})

export class AppointmentService {

  constructor(private http: HttpClient,
    private auth: AuthService) {
  }



  async createNewAppointment(appointmentInfo: NewAppointment): Promise<any> {

    try {

      const url = environment.apiUrl + 'api/appointment/createAppointment';
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
      });

      const response = await this.http.post<any>(url, appointmentInfo, { headers }).toPromise();
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

      const url = environment.apiUrl + 'api/appointment/getAllAppointments/' + localStorage.getItem('User_ID');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
      });

      const result = await this.http.get<any>(url, { headers }).toPromise();
      return result;

    } catch (error) {

    }

  }

}
