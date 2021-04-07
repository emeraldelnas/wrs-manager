import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageProductsRoutingModule } from './manage-products-routing.module';
import { ManageProductsComponent } from './manage-products.component';
import { MProductsComponent } from './m-products/m-products.component';


@NgModule({
  declarations: [
    ManageProductsComponent,
    MProductsComponent
  ],
  imports: [
    CommonModule,
    ManageProductsRoutingModule
  ]
})
export class ManageProductsModule { }
