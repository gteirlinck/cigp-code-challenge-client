import { Component, OnInit } from '@angular/core';
import { ServerAPIService } from './server-api.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <app-menu></app-menu>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  constructor(public service: ServerAPIService, public authService: AuthService) {
    authService.handleAuthentication();
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.renewTokens();
    }
  }
}
