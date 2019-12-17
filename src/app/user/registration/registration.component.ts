import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

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
  }

  constructor(public service: UserService, private toastr: ToastrService) { }

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
        },
      err => {
        console.log(err);
        this.toastr.error('Registration failed.');
      }
    );
  }
}
