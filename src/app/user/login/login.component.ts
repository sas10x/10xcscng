import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/models/user/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  formModel = {
    Email: '',
    Password: ''
  }

  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();
    // if (localStorage.getItem('token') != null)
    // this.router.navigateByUrl('/');
  }
  onSubmit(form: NgForm) {
    console.log(form.value);
    this.service.login(form.value).subscribe(
      (res: any) => {
        this.user = res;
        this.service.changeUser(this.user);
        //localStorage.setItem('user', this.user);
        localStorage.setItem('tawo', JSON.stringify(res));
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
