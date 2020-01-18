import { Component, OnInit } from '@angular/core';
import { StoreCartService } from '../../services/store-cart.service';
import { Cart } from '../../model/cart';

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
}
