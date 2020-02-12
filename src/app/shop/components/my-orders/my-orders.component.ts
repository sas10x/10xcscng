import { Component, OnInit } from '@angular/core';
import { Order } from '../../model/order';
import { ProductService } from '../../services/product.service';
import { Cart } from '../../model/cart';

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
