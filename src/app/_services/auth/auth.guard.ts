import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Create AuthService to handle authentication logic

@Injectable({
  providedIn: 'root'
})

export class authGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check if the user is logged in
    if (this.authService.isLoggedIn()) {
      return true; // Allow access to the route
    } else {
      // If not logged in, redirect to the login page (or any other page)
      this.router.navigate(['/login']);
      return false; // Deny access to the route
    }
  }
}