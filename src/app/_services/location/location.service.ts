import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }


  async getAllRegions() {
    try {
      const url = environment.apiUrl + 'api/location/getAllRegions';

      const result = await this.http.get<any>(url).toPromise();
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


  async getProvincesByRegion(id: any) {
    try {
      const url = environment.apiUrl + 'api/location/getProvincesByRegion/' + id;

      const result = await this.http.get<any>(url).toPromise();
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



  async getMunicipalityByProvince(id: any) {
    try {
      const url = environment.apiUrl + 'api/location/getMunicipalityByProvince/' + id;

      const result = await this.http.get<any>(url).toPromise();
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


  async getBarangayByMunicipality(id: any) {
    try {
      const url = environment.apiUrl + 'api/location/getBarangayByMunicipality/' + id;

      const result = await this.http.get<any>(url).toPromise();
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
