import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Grade } from '../../models/shop/grade';
import { Discount } from '../../models/admin/discount';


const gradesUrl = "http://localhost:5000/api/products/grades";
const discountsUrl = "http://localhost:5000/api/discounts";

// const gradesUrl = "http://api.cebusteel.ph/api/products/grades";
// const discountsUrl = "http://api.cebusteel.ph/api/discounts";
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  

  constructor(private http: HttpClient) { }
  getGrades() {
    return this.http.get<Grade[]>(gradesUrl);
  }
  changeDiscount(body) {
    return this.http.post<Discount>(discountsUrl, body);
  }
}
