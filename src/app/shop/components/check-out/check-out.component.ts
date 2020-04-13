import { Component, OnInit } from '@angular/core';
import { StoreCartService } from '../../../shared/services/shop/store-cart.service';
import { Cart } from 'src/app/shared/models/shop/cart';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  carts: Cart[];
  total = 0;
  constructor(private storeService: StoreCartService) { }

  ngOnInit() {
    this.getCart();
    this.getTotal();
  }
  getCart() {
    this.storeService.cart$.subscribe(res => this.carts = res)
  }
  getTotal() {
    this.storeService.currentTotal.subscribe(total => this.total = total)
  }
  placeOrder() {
    this.storeService.placeOrder(this.total);
  }
}
