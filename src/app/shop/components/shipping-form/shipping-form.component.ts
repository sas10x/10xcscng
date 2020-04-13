import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { ProductService } from '../../../shared/services/shop/product.service';
import { Province } from 'src/app/shared/models/shop/province';
import { City } from 'src/app/shared/models/shop/city';
import { Cart } from 'src/app/shared/models/shop/cart';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {
  submitted = false;
  registerForm: FormGroup;
  shipping = {};
  address= {};
  provinces: Province[];
  cities: City[];
  constructor(private formBuilder: FormBuilder, private productService: ProductService) { }
  @Input('cart') cart: Cart;

  ngOnInit() {
    this.getProvinces();
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      company: ['', Validators.required],
      phone: ['', Validators.required],
      province: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      barangay: ['', Validators.required],
    });
  }
  get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        // display form values on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }
    getProvinces() {
      this.productService.getProvinces().subscribe(response => {this.provinces = response;console.log(this.provinces)});
    }
    getCitys(c) {
      this.productService.getCities(c).subscribe(response => this.cities = response);
    } 
}
