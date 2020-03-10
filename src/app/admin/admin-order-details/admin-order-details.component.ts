import { Component, OnInit, Input } from '@angular/core';
import { StoreCartService } from 'src/app/shop/services/store-cart.service';
import { Cart } from 'src/app/shop/model/cart';

@Component({
  selector: 'app-admin-order-details',
  templateUrl: './admin-order-details.component.html',
  styleUrls: ['./admin-order-details.component.css']
})
export class AdminOrderDetailsComponent implements OnInit {

  @Input() carts: Cart[];
  constructor(private storeService: StoreCartService) { }

  ngOnInit() {
  }
  getCart() {
    this.storeService.cart$.subscribe(res => this.carts = res)
  }

}
