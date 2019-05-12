import { Transactions, TransactionType } from './transaction';

export class Holding {
  symbol: string;
  transactions: Transactions;

  constructor(symbol: string, transactions: Transactions = []) {
    this.symbol = symbol;
    this.transactions = transactions;
  }
}

export type Holdings = Holding[];
