import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackDirective } from './directives/back/back.directive';

@NgModule({
  declarations: [BackDirective],
  imports: [CommonModule],
  exports: [BackDirective],
})
export class SharedModule {}
