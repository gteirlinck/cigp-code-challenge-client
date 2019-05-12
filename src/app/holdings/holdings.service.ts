import { Injectable } from '@angular/core';
import { Holdings, Holding } from './holding';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../app-config';
import { TransactionType } from './transaction';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HoldingsService {
  private holdings: Holdings = [];
  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  private get authHeader(): string {
    return `Bearer ${this.authService.accessToken}`;
  }

  getAllHoldings(): Holdings {
    return this.holdings;
  }

  getOrCreateHolding(symbol: string): Holding {
    let holding = this.holdings.find(h => h.symbol === symbol);

    if (!holding) {
      holding = new Holding(symbol);
      this.holdings = this.holdings.concat([holding]);
    }

    return holding;
  }

  buy(symbol: string, quantity: number, price: number): void {
    this.addTransaction(symbol, quantity, price, TransactionType.Buy);
  }

  sell(symbol: string, quantity: number, price: number): void {
    this.addTransaction(symbol, quantity, price, TransactionType.Sell);
  }

  private addTransaction(symbol: string, quantity: number, price: number, type: TransactionType) {
    const holding = this.getOrCreateHolding(symbol);
    holding.transactions = holding.transactions.concat([
      {
        type,
        quantity,
        price
      }
    ]);

    this.addOrUpdateHoldingOnServer(holding);
  }

  loadAllHoldings(): void {
    this.getHoldingsFromServer().subscribe(holdings => {
      this.holdings = holdings;
    });
  }

  private getHoldingsFromServer(): Observable<Holdings> {
    return this.httpClient.get<Holdings>(`${AppConfig.APIEndpoint}/holdings`, {
      headers: new HttpHeaders().set('Authorization', this.authHeader)
    });
  }

  private getHoldingFromServer(symbol: string): Observable<Holding> {
    return this.httpClient.get<Holding>(`${AppConfig.APIEndpoint}/holdings/${symbol}`, {
      headers: new HttpHeaders().set('Authorization', this.authHeader)
    });
  }

  private createHoldingOnServer(holding: Holding): void {
    this.httpClient
      .post(`${AppConfig.APIEndpoint}/holdings`, holding, {
        headers: new HttpHeaders().set('Authorization', this.authHeader)
      })
      .subscribe(
        () => {
          this.loadAllHoldings();
        },
        err => console.error(err)
      );
  }

  private updateHoldingOnServer(holding: Holding): void {
    this.httpClient
      .put(`${AppConfig.APIEndpoint}/holdings/${holding.symbol}`, holding, {
        headers: new HttpHeaders().set('Authorization', this.authHeader)
      })
      .subscribe(
        () => {
          this.loadAllHoldings();
        },
        err => console.error(err)
      );
  }

  addOrUpdateHoldingOnServer(holding: Holding): void {
    this.getHoldingFromServer(holding.symbol).subscribe(
      holdingFromDB => {
        if (holdingFromDB) {
          this.updateHoldingOnServer(holding);
        } else {
          this.createHoldingOnServer(holding);
        }
      },
      err => console.error(err)
    );
  }

  getPosition(holding: Holding): number {
    return holding.transactions.reduce(
      (cumulQuantity, tran) => cumulQuantity + (tran.type === TransactionType.Buy ? 1 : -1) * tran.quantity,
      0
    );
  }

  getAverageCost(holding: Holding): number {
    return this.getPosition(holding) === 0
      ? 0
      : holding.transactions.reduce((cumulTotal, tran) => {
          return cumulTotal + (tran.type === TransactionType.Buy ? 1 : -1) * tran.quantity * tran.price;
        }, 0) / this.getPosition(holding);
  }
}
