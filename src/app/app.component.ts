import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'SibutMC-UI';

  constructor(public authService: AuthService) {
    // Check the authentication state on application initialization
    this.syncAuthenticationState();
  }

  ngOnInit(): void {

  }

  private syncAuthenticationState(): void {
    if (this.authService.isLoggedIn()) {
      // You might want to validate the token with the server here to ensure its validity
      // If the token is valid, mark the user as logged in
      // If the token is invalid or expired, perform a logout
    }
  }

}
