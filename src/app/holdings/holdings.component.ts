import { Component, OnInit } from '@angular/core';
import { HoldingsService } from './holdings.service';
import { AuthService } from '../auth/auth.service';
import { Holdings, Holding } from './holding';

@Component({
  selector: 'app-holdings',
  templateUrl: './holdings.component.html',
  styles: []
})
export class HoldingsComponent implements OnInit {
  displayedColumns: string[] = ['type', 'quantity', 'price'];

  constructor(private holdingsService: HoldingsService, private authService: AuthService) {}

  get userName(): string {
    return this.authService.userName;
  }

  get holdings(): Holdings {
    return this.holdingsService.getAllHoldings();
  }

  getPosition(holding: Holding): number {
    return this.holdingsService.getPosition(holding);
  }

  getAverageCost(holding: Holding): number {
    return this.holdingsService.getAverageCost(holding);
  }

  ngOnInit(): void {
    this.holdingsService.loadAllHoldings();
  }
}
