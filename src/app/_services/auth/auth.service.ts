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
  // userId: string = 'f2592f56-6311-4688-8d08-aadd5b096945';

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
