import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SymbolQuoteComponent } from './symbol-quote/symbol-quote.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { LoginControlComponent } from './login-control/login-control.component';
import { CallbackComponent } from './callback/callback.component';
import { SearchboxControlComponent } from './searchbox-control/searchbox-control.component';
import { SearchResultsDialogComponent } from './search-results-dialog/search-results-dialog.component';
import { BuySellPanelComponent } from './buy-sell-panel/buy-sell-panel.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment';
import { HoldingsComponent } from './holdings/holdings.component';
import { MenuComponent } from './menu/menu.component';
import { StockComponent } from './stock/stock.component';
import { HomeComponent } from './home/home.component';

const config: SocketIoConfig = { url: environment.APIEndpoint, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    SymbolQuoteComponent,
    LoginControlComponent,
    CallbackComponent,
    SearchboxControlComponent,
    SearchResultsDialogComponent,
    BuySellPanelComponent,
    HoldingsComponent,
    MenuComponent,
    StockComponent,
    HomeComponent
  ],
  imports: [
    AmChartsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatToolbarModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  entryComponents: [SearchResultsDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
