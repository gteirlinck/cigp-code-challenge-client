import { Injectable } from '@angular/core';
import { Holdings, Holding } from './holding';
import { TransactionType } from './transaction';

const SAMPLE_HOLDINGS: Holdings = [
  new Holding('AAPL', [
    { type: TransactionType.Buy, quantity: 10000, price: 150 },
    { type: TransactionType.Sell, quantity: 5000, price: 160 },
    { type: TransactionType.Buy, quantity: 7500, price: 165 }
  ]),
  new Holding('MSFT', [
    { type: TransactionType.Buy, quantity: 10000, price: 150 },
    { type: TransactionType.Sell, quantity: 5000, price: 160 },
    { type: TransactionType.Buy, quantity: 7500, price: 165 }
  ])
];

@Injectable({
  providedIn: 'root'
})
export class HoldingsService {
  private holdings: Holdings = SAMPLE_HOLDINGS;
  constructor() {}

  getAllHoldings(): Holdings {
    return this.holdings;
  }

  getOrCreateHolding(symbol: string): Holding {
    console.log(this.holdings, symbol);
    let holding = this.holdings.find(h => h.symbol === symbol);

    if (!holding) {
      holding = new Holding(symbol);
      this.holdings = this.holdings.concat([holding]);
    }

    return holding;
  }

  buy(symbol: string, quantity: number, price: number): void {
    const holding = this.getOrCreateHolding(symbol);
    holding.buy(quantity, price);
  }

  sell(symbol: string, quantity: number, price: number): void {
    const holding = this.getOrCreateHolding(symbol);
    holding.sell(quantity, price);
  }
}
