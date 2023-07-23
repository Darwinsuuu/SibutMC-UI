import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUserAccount, UpdatePersonalInfo } from 'src/app/_models/UserModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  async createNewPatient(patientInfo: NewUserAccount): Promise<any> {

    try {
      const url = environment.apiUrl + 'api/patient/createPatientAccount';
      const response = await this.http.post<any>(url, patientInfo).toPromise();
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



  async userInformation(userId: string): Promise<any> {

    try {

      const url = environment.apiUrl + 'api/patient/getPatientInfo/' + userId;
      const response = await this.http.get<any>(url).toPromise();
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



  async updatePersonalInfo(personalInfo: any) {

    try {

      const url = environment.apiUrl + 'api/patient/updatePersonalInfo';
      const response = await this.http.put<any>(url, personalInfo).toPromise();
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


  async updateAccountInfo(accountInfo: any) {

    try {

      const url = environment.apiUrl + 'api/patient/updateAccountInfo';
      const response = await this.http.put<any>(url, accountInfo).toPromise();
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


  async updateContactInfo(contactInfo: any) {

    try {

      const url = environment.apiUrl + 'api/patient/updateContactInfo';
      const response = await this.http.put<any>(url, contactInfo).toPromise();
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



  async updateEmegencyContactInfo(emegencyContactInfo: any) {

    try {

      const url = environment.apiUrl + 'api/patient/updateEmegencyContactInfo';
      const response = await this.http.put<any>(url, emegencyContactInfo).toPromise();
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

}
