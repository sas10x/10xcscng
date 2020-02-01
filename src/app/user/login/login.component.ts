import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formModel = {
    Email: '',
    Password: ''
  }

  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();
    if (localStorage.getItem('token') != null)
    this.router.navigateByUrl('/');
  }
  onSubmit(form: NgForm) {
    console.log(form.value);
    this.service.login(form.value).subscribe(
      (res: any) => {
        console.log(res.token);
        localStorage.setItem('token', res.token);
        form.resetForm();
        this.router.navigateByUrl('/shop/cart');
      },
      err => {
        //if (err.status == 400) {
        //this.service.values().subscribe((res: any) => {console.log(res)})
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');}
       // else
          //console.log(err);
      //}
    );
  }
  signup() {
    this.router.navigateByUrl('/user/register');
  }
}
