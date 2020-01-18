import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../model/cart';
import { EffectsCartService } from './effects-cart.service';
import { uuid } from './uuid';
import { Order } from '../model/order';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreCartService {
  message = 0;
  total = 0;
  test = 0;
  sessionOrder: Order;
  
  constructor(private effectsService: EffectsCartService) {
    this.fetchAll()
   }
  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: number) {
    this.messageSource.next(message);
  }

  private totalSource = new BehaviorSubject(0);
  currentTotal = this.totalSource.asObservable();
  changeTotal(total: number) {
    this.totalSource.next(total);
  }

  private readonly _carts = new BehaviorSubject<Cart[]>([]);
  readonly carts$ = this._carts.asObservable();

  readonly cart$ = this.carts$.pipe(
    map(carts => this.carts)
  )

  readonly total$ = this.carts$.pipe(
    map(carts => this.carts)
  )


  get carts(): Cart[] {
    return this._carts.getValue();
  }

  set carts(val: Cart[]) {
    this._carts.next(val);
  }
  async createOrder() {
    let cartId = localStorage.getItem('storeObj');
    if (cartId) {this.sessionOrder = JSON.parse(localStorage.getItem('storeObj'));console.log(this.sessionOrder)}
    else {
      this.effectsService.createOrder().subscribe(res => {
        this.sessionOrder = res;
        localStorage.setItem('storeObj', JSON.stringify(res));
      });
    }
  }
  async fetchAll() {
    let cartId = JSON.parse(localStorage.getItem('storeObj'));
    this.sessionOrder = cartId;
    if (this.sessionOrder) {
      this.carts = await this.effectsService.index(this.sessionOrder.orderId).toPromise();
      this.calculate();
    }
  }
  async addToCart(prod: Product, qty: number) {
    if(prod && this.sessionOrder) {
      const index1 = this.carts.indexOf(this.carts.find(t => t.product === prod.productId));
      if (index1 != -1) // if naa then update
      {
        this.carts[index1].quantity = this.carts[index1].quantity + qty;
        this.carts[index1].total = this.carts[index1].quantity * this.carts[index1].price;
        if (this.carts[index1].quantity <= 0) // remove from array and db table
        {
          this.removeToCart(prod.productId, true);
        }
        else 
        {
          this.carts = [...this.carts];
          try {
            let put = {cartId: this.carts[index1].cartId, quantity: this.carts[index1].quantity, total: this.carts[index1].total}
            this.effectsService.updateCart(put);
            this.calculate();
          }
          catch (e) {
            this.carts[index1].quantity = this.carts[index1].quantity - qty;
            this.carts[index1].total = this.carts[index1].quantity * this.carts[index1].price;
            this.carts = [...this.carts];
            this.calculate();
          }
        }
      } 
      else // wala then create
      {
        const tmpId = uuid();
        const tmpCart = {cartId: tmpId, quantity: 1, price: prod.price, total: prod.price, product: prod.productId, order: this.sessionOrder.orderId, productName: prod.name};
        const postCart= {quantity: 1, price: prod.price, total: prod.price, product: prod.productId, order: this.sessionOrder.orderId};
        this.carts = [
        ...this.carts, 
        tmpCart
        ];
        try 
        {
          const cart = await this.effectsService
            .create(postCart)
            .toPromise();
          const index = this.carts.indexOf(this.carts.find(t => t.cartId === tmpId));
          this.carts[index].cartId = cart.cartId;
          this.carts = [...this.carts];
          this.calculate();
        } 
        catch (e) 
        {
          this.removeToCart(prod.productId, false);
          this.calculate();
        }
      }   
    }
  }
  async removeToCart(id: number, serverRemove = true) {
    const index1 = this.carts.indexOf(this.carts.find(t => t.product ===id));
    let cartId = this.carts[index1].cartId;
    let addback = this.carts[index1];
    this.carts.splice(index1, 1);
    this.carts = [...this.carts];
    if(serverRemove) {
      try {
        await this.effectsService.remove(cartId).toPromise();
      } catch (e) {
        this.carts = [
          ...this.carts, 
          addback
          ];
      }
    }
  }
  calculate() {
    this.message = 0;
    this.total = 0;
    for (let cart in this.carts) {
      this.message += this.carts[cart].quantity;
      this.total += this.carts[cart].total;
      this.changeMessage(this.message);
      this.changeTotal(this.total);
    }

  }
  testAdd(prod: Product) {
    const postCart= {quantity: 1, price: prod.price, total: 0, product: prod.productId, order: this.sessionOrder.orderId};
    this.effectsService.create(postCart).toPromise();
  }
}
