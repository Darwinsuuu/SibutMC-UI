import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input () title: string | undefined;

  constructor(public auth: AuthService) {

  }

}
