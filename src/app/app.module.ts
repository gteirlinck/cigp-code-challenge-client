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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { LoginControlComponent } from './login-control/login-control.component';
import { CallbackComponent } from './callback/callback.component';
import { SearchboxControlComponent } from './searchbox-control/searchbox-control.component';
import { SearchResultsDialogComponent } from './search-results-dialog/search-results-dialog.component';
import { BuySellPanelComponent } from './buy-sell-panel/buy-sell-panel.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment';

console.log(environment.APIEndpoint);
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
    BuySellPanelComponent
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
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  entryComponents: [SearchResultsDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
