import { Component, OnInit } from '@angular/core';
import { Transaction } from '@models/transaction.model';
import { DbService } from '@services/db.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  transactions: Observable<Transaction[]>;

  constructor(private db: DbService) {}

  ngOnInit(): void {
    this.transactions = this.db.transactions;
  }
}
