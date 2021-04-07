import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
})
export class ManageProductsComponent implements OnInit {
  addProductModalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  openAddProductModal(template: TemplateRef<any>): void {
    this.addProductModalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-dialog-centered' })
    );
  }
}
