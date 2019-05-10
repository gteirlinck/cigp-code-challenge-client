import { Component, Input, OnChanges } from '@angular/core';
import { ServerAPIService, Quote } from '../server-api.service';

@Component({
  selector: 'app-symbol-quote',
  templateUrl: './symbol-quote.component.html',
  styleUrls: ['./symbol-quote.component.css']
})
export class SymbolQuoteComponent implements OnChanges {
  private quote: Quote;

  @Input()
  private symbol: string;

  constructor(private service: ServerAPIService) {}

  ngOnChanges() {
    this.loadLatestQuote();
  }

  loadLatestQuote() {
    if (this.symbol) {
      this.service
        .getLatestQuote(this.symbol)
        .subscribe(quote => (this.quote = quote));
    }
  }

  getProperties(): [string, any][] {
    if (this.quote) {
      return Object.entries(this.quote);
    } else {
      return [];
    }
  }
}
