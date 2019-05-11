import { Transactions, TransactionType } from './transaction';

export class Holding {
  private _symbol: string;
  private transactions: Transactions;

  constructor(symbol: string, transactions: Transactions = []) {
    this._symbol = symbol;
    this.transactions = transactions;
  }

  get symbol() {
    return this._symbol;
  }

  get position(): number {
    return this.transactions.reduce(
      (cumulQuantity, tran) =>
        cumulQuantity +
        (tran.type === TransactionType.Buy ? 1 : -1) * tran.quantity,
      0
    );
  }

  get averageCost(): number {
    return this.position === 0
      ? 0
      : this.transactions.reduce((cumulTotal, tran) => {
          console.log(tran);
          return (
            cumulTotal +
            (tran.type === TransactionType.Buy ? 1 : -1) *
              tran.quantity *
              tran.price
          );
        }, 0) / this.position;
  }

  buy(quantity: number, price: number): void {
    this.addTransaction(quantity, price, TransactionType.Buy);
  }

  sell(quantity: number, price: number): void {
    this.addTransaction(quantity, price, TransactionType.Sell);
  }

  private addTransaction(
    quantity: number,
    price: number,
    type: TransactionType
  ) {
    this.transactions = this.transactions.concat([
      {
        type,
        quantity,
        price
      }
    ]);
  }
}

export type Holdings = Holding[];
