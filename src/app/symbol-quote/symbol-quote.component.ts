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
export class SymbolQuoteComponent {
  get quote(): Quote {
    return this.service.latestQuote;
  }

  @Input()
  stock: SearchResultItem;

  constructor(private service: ServerAPIService) {}
}
