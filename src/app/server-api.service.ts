import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppConfig } from './app-config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerAPIService {
  activeSymbol: string = null;
  constructor(private httpClient: HttpClient) {}

  getTimeSeries(symbol: string): Observable<DailyTimeSeriesPoint[]> {
    return this.httpClient.get<DailyTimeSeriesPoint[]>(
      `${AppConfig.APIEndpoint}/data/${symbol}/series`
    );
  }

  getLatestQuote(symbol: string): Observable<Quote> {
    return this.httpClient.get<Quote>(
      `${AppConfig.APIEndpoint}/data/${symbol}/latest`
    );
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
