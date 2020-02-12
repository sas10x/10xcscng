import { Component, OnInit, Input } from '@angular/core';
import { Cart } from '../../model/cart';
import { StoreCartService } from '../../services/store-cart.service';

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
