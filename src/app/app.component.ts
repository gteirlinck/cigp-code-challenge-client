import { Component, OnInit } from '@angular/core';
import { ServerAPIService } from './server-api.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CIGP Stock Picker';

  constructor(
    public service: ServerAPIService,
    private authService: AuthService
  ) {
    authService.handleAuthentication();
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.renewTokens();
    }
  }
}
