import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-today-sales',
  templateUrl: './today-sales.component.html',
  styleUrls: ['./today-sales.component.scss'],
})
export class TodaySalesComponent implements OnInit {
  today: string;

  constructor() {
    this.getToday();
  }

  ngOnInit(): void {}

  getToday(): void {
    const date = new Date();
    const options = {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    };

    this.today = date.toLocaleDateString('en-us', options);
  }
}
