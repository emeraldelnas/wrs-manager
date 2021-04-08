import { Component, OnInit } from '@angular/core';
import { DbService } from '@services/db.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[];

  constructor(private db: DbService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  async getProducts(): Promise<void> {
    this.products = await this.db.aGetProducts();
  }
}
