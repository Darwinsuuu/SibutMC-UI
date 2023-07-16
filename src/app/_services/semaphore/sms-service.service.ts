import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OTPMessageModel } from 'src/app/_models/SemaphoreModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SmsServiceService {

  constructor(private http: HttpClient) { }

  async sendOTPCreateAccount(credentails: OTPMessageModel) {
    
    try {

      const url = environment.apiUrl + 'api/semaphore/sendOTP'
      const result = await this.http.post<OTPMessageModel>(url, credentails).toPromise();
      return result;
    } catch(error) {
      return error;
    }

  }

}
