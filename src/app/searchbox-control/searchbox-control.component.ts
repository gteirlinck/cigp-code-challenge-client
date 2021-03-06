import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ServerAPIService, SearchResultItem } from '../server-api.service';
import { MatDialog } from '@angular/material/dialog';
import { SearchResultsDialogComponent } from '../search-results-dialog/search-results-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbox-control',
  template: `
    <span [ngSwitch]="mode">
      <span *ngSwitchCase="'typing'">
        <button mat-icon-button (click)="search()">
          <mat-icon>search</mat-icon>
        </button>
        <mat-form-field>
          <input matInput type="text" [formControl]="keyword" (keyup.enter)="search()" required />
        </mat-form-field>
      </span>
      <span *ngSwitchCase="'searching'">
        <mat-icon>search</mat-icon>
        <mat-progress-bar mode="buffer" color="accent"></mat-progress-bar>
      </span>
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

  constructor(private service: ServerAPIService, public dialog: MatDialog, private router: Router) {}

  ngOnInit() {}

  search() {
    if (!this.keyword.valid) {
      return;
    }

    const searchedKeyword = this.keyword.value; // Save the value before we reset the searchbox value to empty
    this.keyword.setValue('');
    this.mode = 'searching';
    this.service.searchSymbol(searchedKeyword).subscribe(
      results => {
        this.mode = 'idle';
        this.openDialog(searchedKeyword, results);
      },
      err => {
        console.error(err);
        this.mode = 'idle';
      }
    );
  }

  openDialog(keyword: string, results: SearchResultItem[]): void {
    const dialogRef = this.dialog.open(SearchResultsDialogComponent, {
      width: '800px',
      data: { keyword, results }
    });

    dialogRef.afterClosed().subscribe(async symbol => {
      if (symbol) {
        await this.service.setActiveStock(symbol);
        this.router.navigate(['/stock']);
      }
    });
  }
}
