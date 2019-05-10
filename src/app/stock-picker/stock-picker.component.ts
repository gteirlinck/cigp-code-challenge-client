import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ServerAPIService, SearchResultItem } from '../server-api.service';

@Component({
  selector: 'app-stock-picker',
  templateUrl: './stock-picker.component.html',
  styleUrls: ['./stock-picker.component.css']
})
export class StockPickerComponent implements OnInit {
  constructor(private service: ServerAPIService) {}

  keyword = new FormControl('');
  results: SearchResultItem[] = [];

  ngOnInit() {}

  search() {
    this.service.searchSymbol(this.keyword.value).subscribe(results => {
      this.results = results;
      this.keyword.setValue('');
    });
  }

  setActiveSymbol(symbol: string) {
    this.service.activeSymbol = symbol;
    this.results = [];
  }
}
