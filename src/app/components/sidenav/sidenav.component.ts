import { Component, OnInit } from '@angular/core';
import { faHome, faUserGroup, faCalendarCheck, faHospitalUser, faClipboardList, faRightFromBracket, faUserGear, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent implements OnInit {

  constructor() {}

  navList: any[] = [
    {
      category: "Admin",
      nav: [
        {navName: "Dashboard", navLink: "/dashboard", icon: faHome},
        {navName: "Employees", navLink: "/employees", icon: faUserGroup},
        {navName: "Appointments", navLink: "/appointment", icon: faCalendarCheck},
        {navName: "Patients", navLink: "/test", icon: faHospitalUser},
        {navName: "Activity Log", navLink: "/test", icon: faClipboardList},
      ]
    },

    // {
    //   category: "Staff",
    //   nav: [
    //     {navName: "Appointments", navLink: "/test", icon: faCalendarCheck},
    //     {navName: "Patients", navLink: "/test", icon: faHospitalUser},
    //   ]
    // },

    // {
    //   category: "Patient",
    //   nav: [
    //     {navName: "Appointments", navLink: "/test", icon: faCalendarCheck},
    //     {navName: "Medical Record", navLink: "/test", icon: faHospitalUser},
    //   ]
    // },
    
    {
      category: "Account",
      nav: [
        {navName: "Account Settings", navLink: "/test", icon: faUserGear},
        {navName: "Logout", navLink: "/test", icon: faRightFromBracket},
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
