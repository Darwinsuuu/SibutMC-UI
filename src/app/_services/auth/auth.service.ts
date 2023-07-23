import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from 'src/app/_models/UserModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth: boolean = false;
  userType: number = 0;
  userId: string = '';


  // isAuth: boolean = true;
  // userType: number = 3;
  // userId: string = 'a07bcf8b-21a4-4373-96a7-33c03a31dbc0';

  constructor(private http: HttpClient) { }

  async login(credentials: UserLogin, path: string): Promise<any> {

    const url = environment.apiUrl + 'api/auth/' + path;

    try {

      const response = await this.http.post<any>(url, credentials).toPromise();
      if (response.success === true) {
        this.userId = response.userId;
        this.isAuth = true;
        this.userType = path === 'adminAuthentication' ? 1 :
          path === 'staffAuthentication' ? 2 : 3;
      }

      return response;

    } catch (error: any) {

      throw error.error;
    }

  }



}
