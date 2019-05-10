import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolQuoteComponent } from './symbol-quote.component';

describe('SymbolQuoteComponent', () => {
  let component: SymbolQuoteComponent;
  let fixture: ComponentFixture<SymbolQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
