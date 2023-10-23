import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUserAccount, UpdatePersonalInfo } from 'src/app/_models/UserModel';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient,
    private auth: AuthService) { }

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


  async getAllPatientInformation(): Promise<any> {

    try {

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
      });

      const url = environment.apiUrl + 'api/patient/getAllPatientInformation';
      const response = await this.http.get<any>(url, { headers }).toPromise();
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

  async getUserInfoByContact(contact: any) {

    try {

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
      });

      const url = environment.apiUrl + 'api/patient/getUserInfoByContact/';

      const response = await this.http.post<any>(url, { contact_no: contact }, { headers }).toPromise();
      return response.result;

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


  async getUserUpdatePassword(data: any) {
    try {

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
      });

      const url = environment.apiUrl + 'api/patient/getUserUpdatePassword/';

      const response = await this.http.post<any>(url, data, { headers }).toPromise();
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


  async userInformation(userId: any): Promise<any> {

    try {

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
      });

      const url = environment.apiUrl + 'api/patient/getPatientInfo/' + userId;

      const response = await this.http.get<any>(url, { headers }).toPromise();
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





  async getPatientMedicalInformation(userId: any): Promise<any> {

    try {

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
      });

      const url = environment.apiUrl + 'api/patient/getPatientMedicalInformation/' + userId;
      console.log(url)

      const response = await this.http.get<any>(url, { headers }).toPromise();
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

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
      });

      const url = environment.apiUrl + 'api/patient/updatePersonalInfo';
      const response = await this.http.put<any>(url, personalInfo, { headers }).toPromise();
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

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
      });

      const url = environment.apiUrl + 'api/patient/updateAccountInfo';
      const response = await this.http.put<any>(url, accountInfo, { headers }).toPromise();
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

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
      });

      const url = environment.apiUrl + 'api/patient/updateContactInfo';
      const response = await this.http.put<any>(url, contactInfo, { headers }).toPromise();
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

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
      });

      const url = environment.apiUrl + 'api/patient/updateEmegencyContactInfo';
      const response = await this.http.put<any>(url, emegencyContactInfo, { headers }).toPromise();
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


  async updateAddressInfo(addressInfo: any) {

    try {

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
      });

      const url = environment.apiUrl + 'api/patient/updateAddressInfo';
      const response = await this.http.put<any>(url, addressInfo, { headers }).toPromise();
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

  async updateMedicalInfo(medicalInfo: any) {

    try {

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
      });

      const url = environment.apiUrl + 'api/patient/updateMedicalInfo';
      const response = await this.http.put<any>(url, medicalInfo, { headers }).toPromise();
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



  async printMedicalRecord(user_id: any) {
    try {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('JWT_TOKEN')}`,
      });

      const url = environment.apiUrl + 'api/patient/printPatientMedicalRecord';
      const response = await this.http
        .post(url, { user_id: user_id }, { headers, responseType: 'blob' })
        .toPromise();

      if (response) {
        this.downloadBlobAsPDF(response, 'medical_record.pdf');
      } else {
        console.error('No response received from the server');
      }
    } catch (error: any) {
      console.error('Error:', error);
    }
  }

  private downloadBlobAsPDF(blob: Blob, fileName: string) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(link.href);
  }
}
