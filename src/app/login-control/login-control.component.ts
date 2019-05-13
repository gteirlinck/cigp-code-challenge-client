import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login-control',
  template: `
    <span>
      <button mat-button *ngIf="!auth.isAuthenticated()" (click)="auth.login()">
        Log In
      </button>
      <button mat-button *ngIf="auth.isAuthenticated()" (click)="auth.logout()">
        Log Out
      </button>
    </span>
  `,
  styles: ['button { text-transform: uppercase; }']
})
export class LoginControlComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit() {}
}
