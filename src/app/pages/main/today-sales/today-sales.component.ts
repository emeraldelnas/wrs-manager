import { Component, OnInit } from '@angular/core';
import { DbService } from '@services/db.service';
import { Observable } from 'rxjs';
import { map, reduce } from 'rxjs/operators';

@Component({
  selector: 'app-today-sales',
  templateUrl: './today-sales.component.html',
  styleUrls: ['./today-sales.component.scss'],
})
export class TodaySalesComponent implements OnInit {
  today: string;
  todayTotal: Observable<number>;

  constructor(private db: DbService) {
    this.getToday();
  }

  ngOnInit(): void {
    this.todayTotal = this.db.transactions.pipe(
      map((transaction) =>
        transaction.reduce(
          (prevTotal, currentTransaction) =>
            prevTotal + currentTransaction.total,
          0
        )
      )
    );
  }

  getToday(): void {
    const date = new Date();
    const options = {
      weekday: 'short',
      month: 'long',
      day: 'numeric',
    };
  }
}
