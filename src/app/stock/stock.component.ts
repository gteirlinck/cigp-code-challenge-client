import { Component, OnInit } from '@angular/core';
import { ServerAPIService } from '../server-api.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styles: []
})
export class StockComponent {
  constructor(public service: ServerAPIService, public authService: AuthService, private router: Router) {
    if (!this.service.activeStock) {
      this.router.navigate(['']);
    }
  }
}
