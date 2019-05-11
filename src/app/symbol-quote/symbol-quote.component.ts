import { Component, Input, OnChanges } from '@angular/core';
import {
  ServerAPIService,
  Quote,
  SearchResultItem
} from '../server-api.service';

@Component({
  selector: 'app-symbol-quote',
  templateUrl: './symbol-quote.component.html',
  styleUrls: ['./symbol-quote.component.css']
})
export class SymbolQuoteComponent implements OnChanges {
  quote: Quote;

  @Input()
  stock: SearchResultItem;

  constructor(private service: ServerAPIService) {}

  ngOnChanges() {
    this.loadLatestQuote();
  }

  loadLatestQuote() {
    if (this.stock) {
      this.service
        .getLatestQuote(this.stock.symbol)
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
