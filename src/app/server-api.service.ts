import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppConfig } from './app-config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerAPIService {
  private _activeStock: SearchResultItem = null;

  get activeStock(): SearchResultItem {
    return this._activeStock;
  }

  set activeStock(value: SearchResultItem) {
    if (!this._activeStock || value.symbol !== this._activeStock.symbol) {
      this._activeStock = value;
      this.loadLatestQuote();
    }
  }

  latestQuote: Quote = null;
  constructor(private httpClient: HttpClient) {}

  getTimeSeries(symbol: string): Observable<DailyTimeSeriesPoint[]> {
    return this.httpClient.get<DailyTimeSeriesPoint[]>(
      `${AppConfig.APIEndpoint}/data/${symbol}/series`
    );
  }

  private loadLatestQuote(): void {
    this.httpClient
      .get<Quote>(
        `${AppConfig.APIEndpoint}/data/${this._activeStock.symbol}/latest`
      )
      .subscribe(quote => {
        this.latestQuote = quote;
      });
  }

  searchSymbol(keyword: string): Observable<SearchResultItem[]> {
    return this.httpClient.get<SearchResultItem[]>(
      `${AppConfig.APIEndpoint}/search-symbol`,
      {
        params: { keyword }
      }
    );
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
}
