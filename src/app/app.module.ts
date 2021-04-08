import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { MainModule } from './pages/main/main.module';
import { ManageProductsModule } from './pages/manage-products/manage-products.module';
import { SalesReportModule } from './pages/sales-report/sales-report.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    MainModule,
    ManageProductsModule,
    SalesReportModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
