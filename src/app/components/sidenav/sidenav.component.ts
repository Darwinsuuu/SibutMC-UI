import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHome, faUserGroup, faCalendarCheck, faHospitalUser, faClipboardList, faRightFromBracket, faUserGear, faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/_services/auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent implements OnInit {

  constructor(public auth: AuthService,
              private router: Router) {}

  access: number = this.auth.userType;

  navList: any[] = [
    {
      category: "Admin",
      module: 1,
      nav: [
        {navName: "Dashboard", navLink: "/dashboard", icon: faHome, accessModule: 1},
        {navName: "Employees", navLink: "/employees", icon: faUserGroup, accessModule: 1},
        {navName: "Appointments", navLink: "/appointment", icon: faCalendarCheck, accessModule: 1},
        {navName: "Patients", navLink: "/patients", icon: faHospitalUser, accessModule: 1},
        {navName: "Activity Log", navLink: "/activity", icon: faClipboardList, accessModule: 1},
      ]
    },

    {
      category: "Staff",
      module: 2,
      nav: [
        {navName: "Dashboard", navLink: "/dashboard", icon: faHome, accessModule: 2},
        {navName: "Appointments", navLink: "/appointment", icon: faCalendarCheck, accessModule: 2},
        {navName: "Patients", navLink: "/patients", icon: faHospitalUser, accessModule: 2},
      ]
    },

    {
      module: 3,
      nav: [
        {navName: "Appointments", navLink: "/appointment", icon: faCalendarCheck, accessModule: 3},
        {navName: "My Medical Record", navLink: "/record/"+this.auth.userId, icon: faHospitalUser, accessModule: 3},
      ]
    },
    
    {
      category: "Account",
      module: 0,
      nav: [
        {navName: "Account Settings", navLink: "/account", icon: faUserGear, accessModule: 3},
        {navName: "Logout", navLink: "/logout", icon: faRightFromBracket, accessModule: 0},
      ]
    },
    
  ];

  faBars = faBars;
  isNavOpen: boolean = false;


  ngOnInit(): void {
  }

  navToggle() {
    this.isNavOpen = !this.isNavOpen;
  }

}
