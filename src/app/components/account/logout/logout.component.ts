import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private location: Location, 
              private auth: AuthService, 
              private route: Router) {
    
  }

  ngOnInit(): void {
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
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else {
        this.location.back();
      }
    })
  } 


}
