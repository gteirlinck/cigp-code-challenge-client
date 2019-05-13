import { Component, OnInit } from '@angular/core';
import { ServerAPIService } from '../server-api.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    'button { text-transform: uppercase; }',
    'a { text-transform: uppercase; }',
    '.fill-space { flex: 1 1 auto; }'
  ]
})
export class MenuComponent implements OnInit {
  constructor(private service: ServerAPIService, private authService: AuthService) {}

  get showStock(): boolean {
    return !!this.service.activeStock;
  }

  get showHoldings(): boolean {
    return this.authService.isAuthenticated();
  }

  ngOnInit() {}
}
