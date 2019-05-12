import { Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { ServerAPIService, Quote, SearchResultItem } from '../server-api.service';

@Component({
  selector: 'app-symbol-quote',
  templateUrl: './symbol-quote.component.html',
  styleUrls: ['./symbol-quote.component.css']
})
export class SymbolQuoteComponent implements OnInit, OnDestroy {
  get quote(): Quote {
    return this.service.latestQuote;
  }

  @Input()
  stock: SearchResultItem;

  constructor(private service: ServerAPIService) {}

  async ngOnInit() {
    await this.service.subscribeToSymbolUpdates();
  }

  async ngOnDestroy() {
    await this.service.unsubscribeFromSymbolUpdates();
  }
}
