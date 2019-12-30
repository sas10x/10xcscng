import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { Length } from './model/length';
import { Grade } from './model/grade';
import { Diameter } from './model/diameter';
import { switchMap } from 'rxjs/operators';
import { Product } from './model/product';
import { StoreCartService } from './services/store-cart.service';

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
  diameters: Diameter[];
  selectedDiameter: Diameter;

  product: Product;

  constructor(private productService: ProductService, private storeService: StoreCartService) { }

  ngOnInit() {
    this.getGrades();
    this.getLengths();
    this.getDiameters();
  }
  getGrades() {
    this.productService.getGrades().subscribe(response => {this.grades = response;console.log(this.grades)});
  }
  getLengths() {
    this.productService.getLengths().subscribe(response => {this.lengths = response;console.log(this.lengths)});
  }
  getDiameters() {
    this.productService.getDiameters().subscribe(response => {this.diameters = response;console.log(this.diameters)});
  }
  getProduct() {
    if (this.selectedGrade == null || this.selectedLength == null || this.selectedDiameter == null) {
      console.log("Not yet")
    }
    else {
      this.productService.getProduct(this.selectedGrade.varGradeId,this.selectedLength.varLengthId,this.selectedDiameter.varDiameterId).subscribe(res => this.product = res)
    }
  }

  onSelect(grade: Grade) : void {
    if (grade.varGradeId != 3) {
      this.diameters = this.diameters.splice(0, 5);
    }
    else {
      this.getDiameters();
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
}
