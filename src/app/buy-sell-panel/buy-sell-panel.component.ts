import { Component, Input, OnChanges, OnInit } from '@angular/core';
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
export class BuySellPanelComponent implements OnInit {
  @Input()
  private symbol: string;

  @Input()
  private latestPrice: number;

  private get holding(): Holding {
    if (this.symbol) {
      return this.holdingsService.getOrCreateHolding(this.symbol);
    } else {
      return null;
    }
  }

  tradingAction = new FormControl();
  tradeQuantity = new FormControl();

  constructor(public holdingsService: HoldingsService) {}

  ngOnInit(): void {
    console.log('Initing');
    this.holdingsService.loadAllHoldings();
  }

  submitTrade(): void {
    if (this.tradingAction.value === 'BUY') {
      this.holdingsService.buy(this.symbol, this.tradeQuantity.value, this.latestPrice);
    } else {
      this.holdingsService.sell(this.symbol, this.tradeQuantity.value, this.latestPrice);
    }

    this.tradeQuantity.reset();
    this.tradingAction.reset();
  }

  get canShow(): boolean {
    return !!this.holding;
  }

  get position(): number {
    return this.holdingsService.getPosition(this.holding);
  }

  get averageCost(): number {
    return this.holdingsService.getAverageCost(this.holding);
  }

  get returnPct(): number {
    return (this.latestPrice - this.averageCost) / this.averageCost;
  }
}
