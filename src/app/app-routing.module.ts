import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ManageProductsComponent } from './pages/manage-products/manage-products.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'manage-products', component: ManageProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
