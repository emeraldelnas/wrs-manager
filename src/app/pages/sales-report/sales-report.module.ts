import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesReportRoutingModule } from './sales-report-routing.module';
import { SalesReportComponent } from './sales-report.component';
import { MonthTotalComponent } from './month-total/month-total.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SalesReportComponent, MonthTotalComponent],
  imports: [CommonModule, SalesReportRoutingModule, SharedModule],
})
export class SalesReportModule {}
