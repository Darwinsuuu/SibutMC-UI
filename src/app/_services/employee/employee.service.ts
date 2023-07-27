import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { EmployeeInsert } from 'src/app/_models/EmployeeModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient,
    private auth: AuthService) { }

  async createNewEmployee(employeeInfo: EmployeeInsert): Promise<any> {

    try {
      const url = environment.apiUrl + 'api/employee/createEmployee';
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
      });
      const response = await this.http.post<any>(url, employeeInfo, { headers }).toPromise();
      return response;

    } catch (error: any) {

      if (error.status === 500) {
        console.error('An internal server error occurred. Please try again later.');
        console.error(error);
      } else {
        console.error('An error occurred. Please try again.');
        console.error(error);
      }

      throw error.error;

    }

  }

  async getAllEmployees() {

    try {

      const url = environment.apiUrl + 'api/employee/getEmployees';
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
      });

      const result = await this.http.get<any>(url, { headers }).toPromise();
      return result;

    } catch (error: any) {

      if (error.status === 500) {
        console.error('An internal server error occurred. Please try again later.');
        console.error(error);
      } else {
        console.error('An error occurred. Please try again.');
        console.error(error);
      }

      throw error.error;

    }

  }


  async updateEmployeeInfo(employeeInfo: any) {

    try {

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
      });

      const url = environment.apiUrl + 'api/employee/updateEmployee';
      const response = await this.http.put<any>(url, employeeInfo, { headers }).toPromise();
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


  async deleteEmployee(userId: any) {
    
    try {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
      });

      const url = environment.apiUrl + 'api/employee/deleteEmployee/'+userId;
      const response = await this.http.put<any>(url, {} ,{ headers }).toPromise();
      return response;
      
    } catch(error: any) {
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
