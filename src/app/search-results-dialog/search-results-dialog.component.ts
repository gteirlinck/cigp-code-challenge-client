import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SearchResultItem } from '../server-api.service';

export interface SearchResultsDialogData {
  keyword: string;
  results: SearchResultItem[];
}

@Component({
  selector: 'app-search-results-dialog',
  templateUrl: './search-results-dialog.component.html',
  styles: []
})
export class SearchResultsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SearchResultsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SearchResultsDialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
