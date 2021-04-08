export interface Product {
  docId?: string;
  name: string;
  price: number;
}

export interface ProductPayload extends Product {
  quantity: number;
}
