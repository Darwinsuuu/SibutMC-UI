import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHome, faUserGroup, faCalendarCheck, faHospitalUser, faClipboardList, faRightFromBracket, faUserGear, faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/_services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent implements OnInit {

  access?: string | null;
  faRightFromBracket = faRightFromBracket

  constructor(public auth: AuthService,
    private router: Router) {
    this.access = localStorage.getItem('User_Type');
  }


  navList: any[] = [
    {
      category: "Admin",
      module: 1,
      nav: [
        { navName: "Dashboard", navLink: "/dashboard", icon: faHome, accessModule: 1 },
        { navName: "Employees", navLink: "/employees", icon: faUserGroup, accessModule: 1 },
        { navName: "Appointments", navLink: "/appointment", icon: faCalendarCheck, accessModule: 1 },
        { navName: "Patients", navLink: "/patients", icon: faHospitalUser, accessModule: 1 },
        { navName: "Activity Log", navLink: "/activity", icon: faClipboardList, accessModule: 1 },
      ]
    },

    {
      category: "Staff",
      module: 2,
      nav: [
        { navName: "Dashboard", navLink: "/dashboard", icon: faHome, accessModule: 2 },
        { navName: "Appointments", navLink: "/appointment", icon: faCalendarCheck, accessModule: 2 },
        { navName: "Patients", navLink: "/patients", icon: faHospitalUser, accessModule: 2 },
      ]
    },

    {
      module: 3,
      nav: [
        { navName: "Appointments", navLink: "/appointment", icon: faCalendarCheck, accessModule: 3 },
        { navName: "My Medical Record", navLink: "/record/" + localStorage.getItem('User_ID'), icon: faHospitalUser, accessModule: 3 },
      ]
    },

    {
      category: "Account",
      module: 0,
      nav: [
        { navName: "Account Settings", navLink: "/account", icon: faUserGear, accessModule: 3 },
      ]
    },

  ];

  faBars = faBars;
  isNavOpen: boolean = false;


  ngOnInit(): void {
    console.log(this.access)
  }

  navToggle() {
    this.isNavOpen = !this.isNavOpen;
  }

  logOutBtn() {
    Swal.fire({
      title: 'LOGOUT',
      text: "Are you sure you want to logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        this.auth.logout();
        Swal.fire(
          'Logged Out',
          'Your account was successfully logged out',
          'success'
        )
      }
    })
  }

}
