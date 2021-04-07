import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

export interface Product {
  name: string;
  price: number;
}

export interface ProductPayload extends Product {
  quantity: number;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Output() quantityConfirmed = new EventEmitter<ProductPayload>();
  quantity = 1;

  confirmModalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  add(): void {
    this.quantity += 1;
  }

  remove(): void {
    if (this.quantity != 1) {
      this.quantity -= 1;
    }
  }

  openConfirmModal(template: TemplateRef<any>): void {
    this.confirmModalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-dialog-centered' })
    );
  }

  confirmQuantity(): void {
    this.quantityConfirmed.emit({
      ...this.product,
      quantity: this.quantity,
    });
    console.log('added', this.quantity);

    this.quantity = 1;

    this.confirmModalRef.hide();
  }
}
