import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbService } from '@services/db.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
})
export class ManageProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  addProductForm: FormGroup;
  addProductModalRef: BsModalRef;

  constructor(
    private db: DbService,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.products$ = this.db.products;
    this.initAddProductForm();
  }

  initAddProductForm(): void {
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  openAddProductModal(template: TemplateRef<any>): void {
    this.addProductModalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-dialog-centered' })
    );
  }

  addProduct(): void {
    this.db
      .addProduct(this.addProductForm.value)
      .then((response) => {
        console.log('Added Product!');
        this.addProductForm.reset();
      })
      .catch((response) => {
        console.log('Ooops... Something went wrong.');
      });

    this.addProductModalRef.hide();
  }
}
