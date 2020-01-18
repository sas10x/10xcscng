import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { HttpClient } from '@angular/common/http';
import { Grade } from '../model/grade';
import { Length } from '../model/length';
import { Diameter } from '../model/diameter';
import { Province } from '../model/province';
import { City } from '../model/city';


const productsUrl = "http://localhost:5000/api/products?grade=";
const lengthsUrl = "http://localhost:5000/api/products/lengths";
const diametersUrl = "http://localhost:5000/api/products/diameters";
const gradesUrl = "http://localhost:5000/api/products/grades";
const provincesUrl = "http://localhost:5000/api/products/provinces";
const citysUrl = "http://localhost:5000/api/products/citys/";

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
}
