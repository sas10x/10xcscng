import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CustomValidators } from './custom-validators';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  private readonly _users = new BehaviorSubject<User>(null);
  readonly users$ = this._users.asObservable();

  readonly BaseURI = 'http://localhost:5000/api';
  // readonly BaseURI = 'http://api.cebusteel.ph/api';
  
  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    DisplayName: ['', Validators.required],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(6)],
      CustomValidators.patternValidator(/\d/, {hasNumber: true}),
      CustomValidators.patternValidator(/[A-Z]/, {hasCapitalCase: true}),
      CustomValidators.patternValidator(/[a-z]/, {hasSmallCase: true}),
      CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,{hasSpecialCharacters: true}),
    ],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords }),
    PhoneNumber: ['', ],
  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }
  register(body) {
    // console.log(this.formModel.value);
    // var body = {
    //   Username: this.formModel.value.UserName,
    //   Email: this.formModel.value.Email,
    //   DisplayName: this.formModel.value.DisplayName,
    //   Password: this.formModel.value.Passwords.Password,
    //   PhoneNumber: this.formModel.value.PhoneNumber
    // };
    console.log(body);
    return this.http.post(this.BaseURI + '/user/register', body);
  }

  login(formData) {
    return this.http.post(this.BaseURI + '/user/login', formData);
  }

  values() {
    return this.http.get(this.BaseURI + '/values');
  }

  getUserProfile() {
    return this.http.get(this.BaseURI + '/user');
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    console.log(payLoad);
    var userRole = payLoad.roles;
    console.log(userRole);
    allowedRoles.forEach(element => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }

  changeUser(user: User) {
      this._users.next(user);
  }
}
