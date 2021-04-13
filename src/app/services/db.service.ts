import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, Transaction } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private currentMonth: string;
  private timestamp: firebase.firestore.FieldValue;
  public products: Observable<Product[]>;
  public transactions: Observable<Transaction[]>;

  constructor(private afs: AngularFirestore) {
    this.timestamp = firebase.firestore.FieldValue.serverTimestamp();

    const today = new Date();
    const options = {
      month: 'long',
      year: 'numeric',
    };

    this.currentMonth = today.toLocaleDateString('en-us', options);

    this.createCurrentMonthTransactionDB().then((res) => {
      this.populateCurrentTotalSales();
    });

    this.products = this.oGetProducts();
    this.transactions = this.getTodaysTransactions();
  }

  async populateCurrentTotalSales(): Promise<void> {
    const totalSalesRef = await this.afs
      .collection('transactions')
      .doc('2zMrdcixo6TgREz4irWB')
      .collection(this.currentMonth)
      .doc('total_sales')
      .get()
      .toPromise();

    this.aGetProducts().then((products: Product[]) => {
      products.forEach((product) => {
        if (!totalSalesRef.get(this.getParsedName(product.name))) {
          this.addNewProductToTotalSales(product);
        }
      });
    });
  }

  async generateProductsCurrentTotalSales(): Promise<void> {
    const data = await this.afs
      .collection('transactions')
      .doc('2zMrdcixo6TgREz4irWB')
      .collection(this.currentMonth)
      .doc('total_sales')
      .get()
      .toPromise();
  }

  async aGetProducts(): Promise<Product[]> {
    const snapshot = await this.afs
      .collection('products', (ref) => {
        return ref.orderBy('created_at', 'asc');
      })
      .get()
      .toPromise();

    const products = [];
    snapshot.forEach((doc) => {
      products.push(doc.data());
    });

    return products;
  }

  oGetProducts(): Observable<Product[]> {
    return this.afs
      .collection('products', (ref) => {
        return ref.orderBy('created_at', 'asc');
      })
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
    return this.afs
      .collection('products')
      .add({ ...product, created_at: this.timestamp });
  }

  deleteProduct(productDocId: string): Promise<any> {
    return this.afs.doc('products/' + productDocId).delete();
  }

  getTodaysTransactions(): Observable<any> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // today.setUTCHours(0, 0, 0, 0);

    return this.afs
      .collection('transactions')
      .doc('2zMrdcixo6TgREz4irWB')
      .collection(this.currentMonth, (ref) =>
        ref.where('created_at', '>', today)
      )
      .valueChanges();
  }

  addTransaction(transaction: Transaction): void {
    const productQuantity = `${this.getParsedName(
      transaction.product.name
    )}.total_count`;
    const productSales = `${this.getParsedName(
      transaction.product.name
    )}.total_sales`;

    console.log(productQuantity, productSales);

    const paylaod = transaction;
    paylaod.created_at = this.timestamp;

    this.afs
      .collection('transactions')
      .doc('2zMrdcixo6TgREz4irWB')
      .collection(this.currentMonth)
      .add(paylaod)
      .then((response) => {
        this.afs
          .collection('transactions')
          .doc('2zMrdcixo6TgREz4irWB')
          .collection(this.currentMonth)
          .doc('total_sales')
          .update({
            [productQuantity]: firebase.firestore.FieldValue.increment(
              transaction.quantity
            ),
            [productSales]: firebase.firestore.FieldValue.increment(
              transaction.total
            ),
          });
      });
  }

  async checkIfMonthExists(): Promise<boolean> {
    const doesMonthExist = await this.afs
      .collection('transactions')
      .doc('2zMrdcixo6TgREz4irWB')
      .collection(this.currentMonth, (ref) => ref.limit(1))
      .get()
      .toPromise();

    return doesMonthExist.empty;
  }

  async createCurrentMonthTransactionDB(): Promise<void> {
    if (await this.checkIfMonthExists()) {
      return this.afs
        .collection('transactions')
        .doc('2zMrdcixo6TgREz4irWB')
        .collection(this.currentMonth)
        .doc('total_sales')
        .set({});
    }
  }

  addNewProductToTotalSales(product: Product): void {
    const fieldName = this.getParsedName(product.name);

    this.afs
      .collection('transactions')
      .doc('2zMrdcixo6TgREz4irWB')
      .collection(this.currentMonth)
      .doc('total_sales')
      .update({
        [fieldName]: {
          product: {
            name: product.name,
            price: product.price,
          },
          total_count: 0,
          total_sales: 0,
        },
      });
  }

  getParsedName(productName: string): string {
    return productName.toLocaleLowerCase().replace(' ', '_');
  }
}
