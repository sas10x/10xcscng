import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  formModel = {
    Email: '',
    Password: '',
    ConfirmPassword: '',
    UserName: '',
    DisplayName: '',
    PhoneNumber: ''
  }

  constructor(public service: UserService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.service.formModel.reset();
  }
  onSubmit() {
    //console.log(form.value);
    this.service.register().subscribe(
      (res: any) => {
          console.log(res);
          this.service.formModel.reset();
          this.toastr.success('New user created!', 'Registration successful.');
          this.router.navigateByUrl('/user/login');
        },
      err => {
        console.log(err);
        this.toastr.error('Registration failed.');
      }
    );
  }
}
