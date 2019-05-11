export enum TransactionType {
  Buy,
  Sell
}

export class Transaction {
  type: TransactionType;
  quantity: number;
  price: number;
}

export type Transactions = Transaction[];
