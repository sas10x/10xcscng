import { Injectable } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class StoreCartService {

  constructor() { }
  async addToCart(product: Product, qty: number) {}
  getCart(id: number) {
  
  }

}
