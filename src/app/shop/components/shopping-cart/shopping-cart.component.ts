import { Component, OnInit } from '@angular/core';
import { Cart } from '../../model/cart';
import { StoreCartService } from '../../services/store-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  carts: Cart[];
  quantity = 0;
  total = 0;
  constructor(private storeService: StoreCartService, private router: Router) { }

  ngOnInit() {
    this.getCart();
    this.getQuantity();
    this.getTotal();
  }
  getQuantity() {
    this.storeService.currentMessage.subscribe(quantity => this.quantity = quantity)
  }
  getCart() {
    this.storeService.cart$.subscribe(res => this.carts = res)
  }
  getTotal() {
    this.storeService.currentTotal.subscribe(total => this.total = total)
  }
  submit() {
    this.router.navigateByUrl('/shop/checkout');
  }
  // placeOrder() {
  //   this.storeService.placeOrder(this.total);
  // }
}
