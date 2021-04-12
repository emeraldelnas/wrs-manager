import { Product } from './product.model';

export interface Transaction {
  created_at: any;
  product: Product;
  quantity: number;
  total: number;
}
