import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { Length } from './model/length';
import { Grade } from './model/grade';
import { Diameter } from './model/diameter';
import { switchMap } from 'rxjs/operators';
import { Product } from './model/product';
import { StoreCartService } from './services/store-cart.service';
import { Order } from './model/order';
import { Cart } from './model/cart';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  grades: Grade[];
  selectedGrade: Grade;
  lengths: Length[];
  selectedLength: Length;
  diametershandler: Diameter[];
  diameters: Diameter[];
  selectedDiameter: Diameter;
  sessionOrder: Order;

  quantity: number = 0;

  carts: Cart[];

  product: Product;

  constructor(private productService: ProductService, private storeService: StoreCartService) { }

  ngOnInit() {
    this.createOrder();
    this.getGrades();
    this.getLengths();
    this.getDiameters();
    this.getCart();
  }
  getCart() {
    this.storeService.cart$.subscribe(res => {
      this.carts = res;
      console.log(this.carts);
      if (this.product)
      {
        this.getQuantity();
      }
    });
  }
  getQuantity() {
    const index1 = this.carts.indexOf(this.carts.find(t => t.product === this.product.productId));
     if (index1 != -1) 
     {
        this.quantity = this.carts[index1].quantity;
     }
    else {
      this.quantity = 0;
    }
  }
  trackById(index, item) {
    return item.id;
  }

  carttrackById(index, item) {
    return item.id;
  }
  createOrder() {
    this.storeService.createOrder();
    let cartId = localStorage.getItem('storeObj');
    if (cartId) {this.sessionOrder = JSON.parse(localStorage.getItem('storeObj'));}
    console.log(this.sessionOrder);
  }
  getGrades() {
    this.productService.getGrades().subscribe(response => {this.grades = response;console.log(this.grades)});
  }
  getLengths() {
    this.productService.getLengths().subscribe(response => {this.lengths = response;console.log(this.lengths)});
  }
  getDiameters() {
    this.productService.getDiameters().subscribe(response => {this.diameters = response;this.diametershandler = this.diameters.splice(5, 5);console.log(this.diameters)});
  }
  getProduct() {
    if (this.selectedGrade == null || this.selectedLength == null || this.selectedDiameter == null) {
      console.log("Not yet")
    }
    else {
      this.productService.getProduct(this.selectedGrade.varGradeId,this.selectedLength.varLengthId,this.selectedDiameter.varDiameterId).subscribe(res => {this.product = res;this.getQuantity()});   
    }
  }

  onSelect(grade: Grade) : void {
    if (grade.varGradeId != 3) {
      this.diameters = this.diameters.splice(0, 5);
      console.log(this.diameters);
      console.log(this.diametershandler);
    }
    else {
      this.diameters = this.diameters.concat(this.diametershandler);
    }
    this.selectedGrade = grade;
    console.log(this.selectedGrade);
    this.getProduct();
  }
  onSelect2(length: Length) : void {
   this.selectedLength = length;
   console.log(this.selectedLength);
   this.getProduct();
 }
 onSelect3(diameter: Diameter) : void {
   this.selectedDiameter = diameter;
   console.log(this.selectedDiameter);
   this.getProduct();
 }
 async addToCart() {
   if (this.product)
   {
    this.storeService.addToCart(this.product, 1);
   }
 }
 async removeToCart() {
  if (this.product)
  {
   this.storeService.addToCart(this.product, -1);
  }
}
}
