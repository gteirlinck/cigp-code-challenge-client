import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { StockPickerComponent } from './stock-picker/stock-picker.component';
import { SymbolQuoteComponent } from './symbol-quote/symbol-quote.component';

@NgModule({
  declarations: [AppComponent, ChartComponent, StockPickerComponent, SymbolQuoteComponent],
  imports: [
    AmChartsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
