import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MainComponent } from './pages/main/main.component';
import { TodaySalesComponent } from './pages/main/today-sales/today-sales.component';
import { TransactionsComponent } from './pages/main/transactions/transactions.component';
import { TransactionComponent } from './pages/main/transactions/transaction/transaction.component';
import { ProductsComponent } from './pages/main/products/products.component';
import { ProductComponent } from './pages/main/products/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TodaySalesComponent,
    TransactionsComponent,
    TransactionComponent,
    ProductComponent,
    ProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
