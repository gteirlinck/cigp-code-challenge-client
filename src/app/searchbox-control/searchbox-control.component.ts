import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ServerAPIService, SearchResultItem } from '../server-api.service';
import { MatDialog } from '@angular/material/dialog';
import { SearchResultsDialogComponent } from '../search-results-dialog/search-results-dialog.component';

@Component({
  selector: 'app-searchbox-control',
  template: `
    <span [ngSwitch]="mode">
      <span *ngSwitchCase="'typing'">
        <button mat-icon-button (click)="search()">
          <mat-icon>search</mat-icon>
        </button>
        <mat-form-field>
          <input
            matInput
            type="text"
            [formControl]="keyword"
            (keyup.enter)="search()"
          />
        </mat-form-field>
      </span>
      <mat-progress-bar
        *ngSwitchCase="'searching'"
        mode="buffer"
        color="accent"
      ></mat-progress-bar>
      <button *ngSwitchDefault mat-button (click)="mode = 'typing'">
        <mat-icon>search</mat-icon>
        Search a Stock
      </button>
    </span>
  `,
  styles: ['button { text-transform: uppercase; }']
})
export class SearchboxControlComponent implements OnInit {
  mode = 'idle';
  keyword = new FormControl('');

  constructor(private service: ServerAPIService, public dialog: MatDialog) {}

  ngOnInit() {}

  search() {
    const searchedKeyword = this.keyword.value; // Save the value before we reset the searchbox value to empty
    this.keyword.setValue('');
    this.mode = 'searching';
    this.service.searchSymbol(searchedKeyword).subscribe(results => {
      this.mode = 'idle';
      this.openDialog(searchedKeyword, results);
    });
  }

  openDialog(keyword: string, results: SearchResultItem[]): void {
    const dialogRef = this.dialog.open(SearchResultsDialogComponent, {
      width: '800px',
      data: { keyword, results }
    });

    dialogRef.afterClosed().subscribe(symbol => {
      if (symbol) {
        this.service.activeSymbol = symbol;
      }
    });
  }
}
