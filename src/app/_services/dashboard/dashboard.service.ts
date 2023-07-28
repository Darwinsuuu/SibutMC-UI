import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient,
    private auth: AuthService) { }

  async getDashboard() {

    try {

      const url = environment.apiUrl + 'api/dashboard/getDashboard';
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

}
