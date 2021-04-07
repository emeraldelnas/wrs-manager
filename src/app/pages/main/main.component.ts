import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
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
