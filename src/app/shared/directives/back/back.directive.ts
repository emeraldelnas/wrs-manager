import { Directive, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appBack]',
})
export class BackDirective {
  constructor(private router: Router) {}

  @HostListener('click', ['$event']) back(): void {
    this.router.navigate(['/'], { replaceUrl: true });
  }
}
