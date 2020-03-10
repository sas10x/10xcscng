import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '../services/custom-validators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public frmSignup: FormGroup;
  // formModel = {
  //   Email: '',
  //   Password: '',
  //   ConfirmPassword: '',
  //   UserName: '',
  //   DisplayName: '',
  //   PhoneNumber: ''
  // }

  constructor(private fb: FormBuilder, public service: UserService, private toastr: ToastrService, private router: Router) {
    this.frmSignup = this.createSignupForm();
  }

  ngOnInit() {
    // this.service.formModel.reset();
  }
  onSubmit() {
    //console.log(form.value);
    // this.service.register().subscribe(
    //   (res: any) => {
    //       console.log(res);
    //       this.service.formModel.reset();
    //       this.toastr.success('New user created!', 'Registration successful.');
    //       this.router.navigateByUrl('/user/login');
    //     },
    //   err => {
    //     console.log(err);
    //     this.toastr.error('Registration failed.');
    //   }
    // );
  }
  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        email: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ],
        userName: [
          null,
          Validators.compose([Validators.required])
        ],
        displayName: [
          null,
          Validators.compose([Validators.required])
        ],
        password: [
          null,
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true
            }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            // check whether the entered password has a lower case letter
            CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true
            }),
            // check whether the entered password has a special character
            CustomValidators.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true
              }
            ),
            Validators.minLength(6)
          ])
        ],
        confirmPassword: [null, Validators.compose([Validators.required])]
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      }
    );
  }
  submit() {
    // do signup or something
    console.log(this.frmSignup.value);
    this.service.register(this.frmSignup.value).subscribe(
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
