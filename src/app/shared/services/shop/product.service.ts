import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/shop/product';
import { Grade } from '../../models/shop/grade';
import { Length } from '../../models/shop/length';
import { Diameter } from '../../models/shop/diameter';
import { Province } from '../../models/shop/province';
import { City } from '../../models/shop/city';
import { Order } from '../../models/shop/order';
import { Cart } from '../../models/shop/cart';


const productsUrl = "http://localhost:5000/api/products?grade=";
const lengthsUrl = "http://localhost:5000/api/products/lengths";
const diametersUrl = "http://localhost:5000/api/products/diameters";
const gradesUrl = "http://localhost:5000/api/products/grades";
const provincesUrl = "http://localhost:5000/api/products/provinces";
const citysUrl = "http://localhost:5000/api/products/citys/";
const cartUrl = "http://localhost:5000/api/carts";
const ordersUrl = "http://localhost:5000/api/orders/";

// const productsUrl = "http://api.cebusteel.ph/api/products?grade=";
// const lengthsUrl = "http://api.cebusteel.ph/api/products/lengths";
// const diametersUrl = "http://api.cebusteel.ph/api/products/diameters";
// const gradesUrl = "http://api.cebusteel.ph/api/products/grades";
// const provincesUrl = "http://api.cebusteel.ph/api/products/provinces";
// const citysUrl = "http://api.cebusteel.ph/api/products/citys/";
// const cartUrl = "http://api.cebusteel.ph/api/carts";
// const ordersUrl = "http://api.cebusteel.ph/api/orders/";

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient) { }

  getProduct(grade: number, length: number, diameter: number) {
    return this.http.get<Product>(productsUrl+grade+"&diameter="+length+"&length="+diameter);
  }

  getGrades() {
    return this.http.get<Grade[]>(gradesUrl);
  }

  getLengths() {
    return this.http.get<Length[]>(lengthsUrl);
  }

  getDiameters() {
    return this.http.get<Diameter[]>(diametersUrl);
  }

  getProvinces() {
    return this.http.get<Province[]>(provincesUrl);
  }

  getCities(id) {
    return this.http.get<City[]>(citysUrl + id);
  }

  getOrders() {
    return this.http.get<Order[]>(ordersUrl);
  }

  getAllOrders() {
    return this.http.get<Order[]>(ordersUrl+'all');
  }

  getCarts(id) {
    return this.http.get<Cart[]>(cartUrl +'/'+ id);
  }
}
