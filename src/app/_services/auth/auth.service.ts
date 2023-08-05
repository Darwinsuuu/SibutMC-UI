import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmptyExpr } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/_models/UserModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static getAuthToken() {
      throw new Error("Method not implemented.");
  }


  isLoggedInStatus: boolean = false;

  constructor(private http: HttpClient,
              private router: Router) {
   }


  private storeAuthToken(token: string, userId : string, userType: string, fullname: string): void {
    localStorage.setItem('JWT_TOKEN', token);
    localStorage.setItem('User_ID', userId);
    localStorage.setItem('User_Type', userType);
    localStorage.setItem('User_Role', ((userType === '1' ? 'Admin' : userType === '2' ? 'Staff' : fullname).replace(/\b\w/g, (match) => match.toUpperCase())));
    localStorage.setItem('User_Fullname', fullname);
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('JWT_TOKEN');
  }

  public getUserType(): string | null {
    return localStorage.getItem('User_Type')?.replace(/\b\w/g, (match) => match.toUpperCase()) || '';
  }

  public getUserRole(): string | null {
    return localStorage.getItem('User_Role');
  }

  public getFullName(): string | null {
    return localStorage.getItem('User_Fullname');
  }

  private clearAuthToken(): void {
    this.isLoggedInStatus = false;
    localStorage.removeItem('JWT_TOKEN');
    localStorage.removeItem('User_ID');
    localStorage.removeItem('User_Type');
    localStorage.removeItem('User_Role');
    localStorage.removeItem('User_Fullname');
  }



  async login(credentials: UserLogin, path: string): Promise<any> {

    const url = environment.apiUrl + 'api/auth/' + path;

    try {

      const response = await this.http.post<any>(url, credentials).toPromise();
      if (response.success === true) {
        this.isLoggedInStatus = true;

        const authToken = response.token;
        const userId = response.userId;
        const userType = response.userType;
        const fullname = response.fullname;

        this.storeAuthToken(authToken, userId, userType, fullname);

      }
      return response;

    } catch (error: any) {
      throw error.error;
    }

  }


  // Simulate a logout action
  logout(): void {
    this.clearAuthToken();
    this.router.navigate(["/login"]);
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!this.getAuthToken();
  }


}
