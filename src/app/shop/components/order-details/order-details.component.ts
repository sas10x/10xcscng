import { Component, OnInit, Input } from '@angular/core';

import { StoreCartService } from '../../../shared/services/shop/store-cart.service';
import { Cart } from 'src/app/shared/models/shop/cart';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  // carts: Cart[];
  @Input() carts: Cart[];
  constructor(private storeService: StoreCartService) { }

  ngOnInit() {
  }
  getCart() {
    this.storeService.cart$.subscribe(res => this.carts = res)
  }
}
