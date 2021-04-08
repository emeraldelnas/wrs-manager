import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private afs: AngularFirestore) {}

  async aGetProducts(): Promise<Product[]> {
    const snapshot = await this.afs.collection('products').get().toPromise();

    const products = [];
    snapshot.forEach((doc) => {
      products.push(doc.data());
    });

    return products;
  }

  oGetProducts(): Observable<Product[]> {
    return this.afs
      .collection('products')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Product;
            const id = a.payload.doc.id;
            return { docId: id, ...data };
          })
        )
      );
  }

  addProduct(product: Product): Promise<any> {
    return this.afs.collection('products').add(product);
  }

  deleteProduct(productDocId: string): Promise<any> {
    return this.afs.doc('products/' + productDocId).delete();
  }
}
