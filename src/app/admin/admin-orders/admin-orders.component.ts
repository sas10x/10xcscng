import { Component, OnInit } from '@angular/core';

import { ProductService } from 'src/app/shared/services/shop/product.service';
import { Order } from 'src/app/shared/models/shop/order';
import { Cart } from 'src/app/shared/models/shop/cart';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[];
  carts: Cart[];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getOrders();
  }
  getOrders() {
    this.productService.getAllOrders().subscribe(res => this.orders = res);
  }
  getCarts(id) {
    this.productService.getCarts(id).subscribe(res => {this.carts = res;console.log(this.carts)});
  }

}
