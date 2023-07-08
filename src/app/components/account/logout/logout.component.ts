import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private auth: AuthService, private route: Router) {
    
  }

  ngOnInit(): void {
    this.auth.isAuth = false;
    this.auth.userType = 0;
    this.route.navigate(['/login'])
  } 


}
