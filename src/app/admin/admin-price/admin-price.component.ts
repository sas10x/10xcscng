import { Component, OnInit } from '@angular/core';
import { Discount } from 'src/app/shared/models/admin/discount';
import { Grade } from 'src/app/shared/models/shop/grade';
import { AdminService } from 'src/app/shared/services/admin/admin.service';


@Component({
  selector: 'app-admin-price',
  templateUrl: './admin-price.component.html',
  styleUrls: ['./admin-price.component.css']
})
export class AdminPriceComponent implements OnInit {
  discount: Discount;
  grade: Grade;
  selectedGrade: Grade;
  grades: Grade[];
  id;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getGrades();
  }
  save(discount) {
   console.log(discount);
   console.log(discount.pursinto);
   var body = {
      Pursinto: discount.pursinto,
      Id: this.selectedGrade.varGradeId
    };
    this.adminService.changeDiscount(body).subscribe( res => console.log(res));
  }
  delete() {

  }
  getGrades() {
    this.adminService.getGrades().subscribe(response => {this.grades = response;console.log(this.grades)});
  }
  onSelect(grade: Grade) {
    console.log(grade);
    this.selectedGrade = grade;
    console.log(grade.name);
    // console.log(this.id);
  }
}
