import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ForbiddenComponent } from './forbidden/forbidden.component';



@NgModule({
  declarations: [UserComponent, LoginComponent, RegistrationComponent, ForbiddenComponent],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ToastrModule.forRoot(), 
    RouterModule.forChild([
      {
      path: '',
      pathMatch: 'full',
      component: UserComponent
      },
      {
      path: 'login',
      component: LoginComponent
      },
      {
      path: 'register',
      component: RegistrationComponent
      },
      {
      path: 'forbidden',
      component: ForbiddenComponent
      }   

  ])
  ]
})
export class UserModule { }
