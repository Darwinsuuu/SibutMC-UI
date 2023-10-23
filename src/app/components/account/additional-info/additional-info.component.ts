import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from 'src/app/_services/location/location.service';
import { UserServiceService } from 'src/app/_services/user/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss']
})

export class AdditionalInfoComponent implements OnInit {


  @Input() fetchedContactInfo: any = {};
  @Input() fetchedEmergencyContact: any = {};

  constructor(private formBuilder: FormBuilder,
    private userService: UserServiceService,
    private locationService: LocationService) {

  }


  ngOnInit(): void {
    this.getAllRegions();

    setTimeout(() => {
      // contact information
      this.contactInfo.get('user_id')?.setValue(this.fetchedContactInfo.user_id);
      this.contactInfo.get('contact_no')?.setValue(this.fetchedContactInfo.contact_no);
      this.contactInfo.get('email')?.setValue(this.fetchedContactInfo.email);

      // address information
      this.addressInfo.get('user_id')?.setValue(this.fetchedContactInfo.user_id);
      this.addressInfo.get('region')?.setValue(this.fetchedContactInfo.region);
      this.addressInfo.get('province')?.setValue(this.fetchedContactInfo.province);
      this.addressInfo.get('cityMun')?.setValue(this.fetchedContactInfo.cityMun);
      this.addressInfo.get('barangay')?.setValue(this.fetchedContactInfo.barangay);

      
      this.getAllProvinceByRegion(this.fetchedContactInfo.region);
      this.getMunicipalityByProvince(this.fetchedContactInfo.province);
      this.getBarangayByMunicipality(this.fetchedContactInfo.cityMun);

      // emergency contact information
      this.emergencyContactInfo.get('user_id')?.setValue(this.fetchedEmergencyContact.user_id);
      this.emergencyContactInfo.get('fullname')?.setValue(this.fetchedEmergencyContact.contact_fullname);
      this.emergencyContactInfo.get('emergency_contact_no')?.setValue(this.fetchedEmergencyContact.emegency_contact_no);
    }, 1000);
  }

  contactInfo: FormGroup = this.formBuilder.group({
    user_id: ["", [Validators.required]],
    contact_no: ["", [Validators.required, Validators.pattern(/^(09|\+639)\d{9}$/)]],
    email: ["", [Validators.required, Validators.email]],
  })

  addressInfo: FormGroup = this.formBuilder.group({
    user_id: ["", [Validators.required]],
    region: ["", [Validators.required]],
    province: ["", [Validators.required]],
    cityMun: ["", [Validators.required]],
    barangay: ["", [Validators.required]],
  })

  emergencyContactInfo: FormGroup = this.formBuilder.group({
    user_id: ["", [Validators.required]],
    fullname: ["", [Validators.required, Validators.pattern(/^[A-Za-z -]+$/)]],
    emergency_contact_no: ["", [Validators.required, Validators.pattern(/^(09|\+639)\d{9}$/)]],
  })

  regionList: any[] = [];
  provinceList: any[] = [];
  municipalityList: any[] = [];
  barangayList: any[] = [];



  async updateContactInfo(contactInfo: FormGroup) {
    if (this.contactInfo.valid) {
      // api call here
      const result = await this.userService.updateContactInfo(contactInfo)
      if (result.success) {
        Swal.fire({
          title: "Success",
          text: result.message,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            // Code to execute if the user confirms the alert
          }
        });
      }
    }
  }


  async updateAddressInfo(addressInfo: FormGroup) {
    if (this.addressInfo.valid) {
      // api call here
      const result = await this.userService.updateAddressInfo(addressInfo)
      if (result.success) {
        Swal.fire({
          title: "Success",
          text: result.message,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            // Code to execute if the user confirms the alert
          }
        });
      }
    }
  }

  async updateEmergencyInfo(emergencyContactInfo: FormGroup) {
    if (this.emergencyContactInfo.valid) {
      // api call here
      const result = await this.userService.updateEmegencyContactInfo(emergencyContactInfo)
      if (result.success) {
        Swal.fire({
          title: "Success",
          text: result.message,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            // Code to execute if the user confirms the alert
          }
        });
      }
    }
  }


  // location
  async getAllRegions() {
    const response = await this.locationService.getAllRegions();
    this.regionList = response.result;
  }

  async getAllProvinceByRegion(id: any) {
    const response = await this.locationService.getProvincesByRegion(id);
    this.provinceList = response.result;
  }

  async getMunicipalityByProvince(id: any) {
    const response = await this.locationService.getMunicipalityByProvince(id);
    this.municipalityList = response.result;
  }

  async getBarangayByMunicipality(id: any) {
    const response = await this.locationService.getBarangayByMunicipality(id);
    this.barangayList = response.result;
  }

  regionSelect(event: any) {
    this.provinceList = [];
    this.municipalityList = [];
    this.barangayList = [];

    this.addressInfo.get('province')?.setValue('')
    this.addressInfo.get('cityMun')?.setValue('')
    this.addressInfo.get('barangay')?.setValue('')

    this.getAllProvinceByRegion(event.value);
  }

  provinceSelect(event: any) {
    this.municipalityList = [];
    this.barangayList = [];
    this.addressInfo.get('cityMun')?.setValue('')
    this.addressInfo.get('barangay')?.setValue('')
    this.getMunicipalityByProvince(event.value);
  }

  cityMunSelect(event: any) {
    this.barangayList = [];
    this.addressInfo.get('barangay')?.setValue('')
    this.getBarangayByMunicipality(event.value);
  }

  


}
