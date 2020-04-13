import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../../shared/services/shop/product.service';
import { Order } from 'src/app/shared/models/shop/order';
import { Cart } from 'src/app/shared/models/shop/cart';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: Order[];
  carts: Cart[];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getOrders();
  }
  getOrders() {
    this.productService.getOrders().subscribe(res => this.orders = res);
  }
  getCarts(id) {
    this.productService.getCarts(id).subscribe(res => {this.carts = res;console.log(this.carts)});
  }
}
