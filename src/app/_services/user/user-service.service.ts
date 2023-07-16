import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUserAccount } from 'src/app/_models/UserModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  async createNewPatient(patientInfo: NewUserAccount): Promise<any> {
    const url = environment.apiUrl + 'api/patient/createPatientAccount';
    try {
      const response = await this.http.post<NewUserAccount>(url, patientInfo).toPromise();
      console.log(response);
      return response;
    } catch (error: any) {
      console.error(error);

      if (error.status === 500) {
        console.log('An internal server error occurred. Please try again later.');
      } else {
        console.log('An error occurred. Please try again.');
      }

      throw error.error;
    }

  }

}
