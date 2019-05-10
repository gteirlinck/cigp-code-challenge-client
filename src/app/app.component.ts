import { Component } from '@angular/core';
import { ServerAPIService } from './server-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cigp';

  constructor(public service: ServerAPIService) {}
}
