import { Injectable } from '@angular/core';
import { Cart } from '../model/cart';
import { HttpClient } from '@angular/common/http';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class EffectsCartService {
  private readonly cartUrl = "http://localhost:5000/api/carts";
  private readonly ordersUrl = "http://localhost:5000/api/orders";

  constructor(private http: HttpClient) { }

  create(cart) {
    return this.http.post<Cart>(this.cartUrl, cart);
  }

  remove(id) {
    return this.http.delete(this.cartUrl+ '/'+ id);
  }

  updateCart(put) {
    this.http.put(this.cartUrl, put).subscribe();
   }
   
   createOrder() {
    return this.http.post<Order>(this.ordersUrl, { amount: 0 });
  }

  index(id) {
    return this.http.get<Cart[]>(this.cartUrl +'/'+ id);
  }

  finalOrder(order) {
    return this.http.put<Order>(this.ordersUrl + '/finish', order);
  }
}
