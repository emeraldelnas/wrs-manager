import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';

import { MainComponent } from './main.component';
import { TodaySalesComponent } from './today-sales/today-sales.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionComponent } from './transactions/transaction/transaction.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';

import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    MainComponent,
    TodaySalesComponent,
    TransactionsComponent,
    TransactionComponent,
    ProductsComponent,
    ProductComponent,
  ],
  imports: [CommonModule, MainRoutingModule, ModalModule.forRoot()],
})
export class MainModule {}
