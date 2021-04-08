import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { DbService } from '@services/db.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Product } from 'src/app/shared/models';

@Component({
  selector: 'app-m-products',
  templateUrl: './m-products.component.html',
  styleUrls: ['./m-products.component.scss'],
})
export class MProductsComponent implements OnInit {
  @Input() product: Product;
  deleteModalRef: BsModalRef;

  constructor(private db: DbService, private modalService: BsModalService) {}

  ngOnInit(): void {}

  openConfirmDeleteModal(template: TemplateRef<any>): void {
    this.deleteModalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-dialog-centered' })
    );
  }

  deleteProduct(): void {
    this.db
      .deleteProduct(this.product.docId)
      .then((response) => {
        console.log('Delete Success!');
      })
      .catch((response) => {
        console.log('Ooops... Something went wrong.');
      });

    this.deleteModalRef.hide();
  }
}
