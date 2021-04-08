import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ManageProductsComponent } from './pages/manage-products/manage-products.component';
import { SalesReportComponent } from './pages/sales-report/sales-report.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'manage-products', component: ManageProductsComponent },
  { path: 'sales-report', component: SalesReportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
