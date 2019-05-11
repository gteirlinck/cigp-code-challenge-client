import { Component, Input, OnChanges } from '@angular/core';
import { HoldingsService } from '../holdings/holdings.service';
import { Holding } from '../holdings/holding';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-buy-sell-panel',
  templateUrl: './buy-sell-panel.component.html',
  styles: [
    'button { text-transform: uppercase; }',
    '.mat-card { width: 100%; }',
    '.mat-card-content { width: 100%; display: flex; align-items: flex-end; }'
  ]
})
export class BuySellPanelComponent implements OnChanges {
  @Input()
  private symbol: string;

  @Input()
  private latestPrice: number;

  holding: Holding;
  tradingAction = new FormControl();
  tradeQuantity = new FormControl();

  constructor(private holdingsService: HoldingsService) {}

  ngOnChanges() {
    if (this.symbol) {
      this.holding = this.holdingsService.getOrCreateHolding(this.symbol);
    }
  }

  submitTrade(): void {
    if (this.tradingAction.value === 'BUY') {
      this.holdingsService.buy(
        this.symbol,
        this.tradeQuantity.value,
        this.latestPrice
      );
    } else {
      this.holdingsService.sell(
        this.symbol,
        this.tradeQuantity.value,
        this.latestPrice
      );
    }

    this.tradeQuantity.reset();
    this.tradingAction.reset();
  }

  get returnPct(): number {
    return (
      (this.latestPrice - this.holding.averageCost) / this.holding.averageCost
    );
  }
}
