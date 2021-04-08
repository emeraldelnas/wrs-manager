import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageProductsRoutingModule } from './manage-products-routing.module';
import { ManageProductsComponent } from './manage-products.component';
import { MProductsComponent } from './m-products/m-products.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ManageProductsComponent, MProductsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManageProductsRoutingModule,
    SharedModule,
  ],
})
export class ManageProductsModule {}
