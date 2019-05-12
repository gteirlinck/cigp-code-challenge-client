import { Injectable } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { AppConfig } from './app-config';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ServerAPIService {
  private _activeStock: SearchResultItem = null;

  get activeStock(): SearchResultItem {
    return this._activeStock;
  }

  latestQuote: Quote = null;
  private quoteUpdateSubscription: Subscription;
  private quoteUpdate = this.socket.fromEvent<Quote>('quoteUpdate');

  private timeSeries: DailyTimeSeriesPoint[] = null;
  private timeSeriesUpdateSubscription: Subscription;
  private timeSeriesUpdate = this.socket.fromEvent<DailyTimeSeriesPoint[]>('timeSeriesUpdate');

  constructor(private httpClient: HttpClient, private socket: Socket) {}

  async setActiveStock(value: SearchResultItem) {
    if (!this._activeStock || value.symbol !== this._activeStock.symbol) {
      try {
        if (!this._activeStock) {
          await this.subscribeToSymbolUpdates(value.symbol);
        } else {
          await this.switchSubscription(this._activeStock.symbol, value.symbol);
        }
      } catch (error) {
        console.error(error);
      }
      this._activeStock = value;
    }
  }

  getTimeSeries(): Observable<DailyTimeSeriesPoint[]> {
    return this.timeSeriesUpdate;
  }

  searchSymbol(keyword: string): Observable<SearchResultItem[]> {
    return this.httpClient.get<SearchResultItem[]>(`${AppConfig.APIEndpoint}/search-symbol`, {
      params: { keyword }
    });
  }

  private async switchSubscription(from: string, to: string) {
    this.socket.emit('switchSubscription', { from, to });
    const result = await this.socket.fromOneTimeEvent<string>('switchedSubscription');
    console.log(result);
  }

  async subscribeToSymbolUpdates(symbol: string = null) {
    this.quoteUpdateSubscription = this.quoteUpdate.subscribe(quote => (this.latestQuote = quote));
    this.timeSeriesUpdateSubscription = this.timeSeriesUpdate.subscribe(timeSeries => {
      this.timeSeries = timeSeries;
    });

    this.socket.emit('subscribe', symbol || this._activeStock.symbol);
    const subscriptionResult = await this.socket.fromOneTimeEvent<string>('subscribed');
    console.log(subscriptionResult);
  }

  async unsubscribeFromSymbolUpdates() {
    this.socket.emit('unsubscribe', this._activeStock.symbol);
    const unsubscriptionResult = await this.socket.fromOneTimeEvent<string>('unsubscribed');
    console.log(unsubscriptionResult);

    this.quoteUpdateSubscription.unsubscribe();
    this.timeSeriesUpdateSubscription.unsubscribe();
  }
}

export class SearchResultItem {
  symbol: string;
  name: string;
  type: string;
}

export class TimeSeriesPoint {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export class DailyTimeSeriesPoint extends TimeSeriesPoint {
  date: Date;
}

export class Quote extends TimeSeriesPoint {
  symbol: string;
  latestTradingDay: Date;
  previousClose: number;
  change: number;
  changePercent: number;
  lastUpdated: Date;
}
