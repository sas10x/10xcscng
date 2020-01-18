import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShopComponent } from './shop.component';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AuthGuard } from '../user/auth/auth.guard';





@NgModule({
  declarations: [ShopComponent, ShoppingCartComponent, CheckOutComponent, ShippingFormComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
      path: '',
      pathMatch: 'full',
      component: ShopComponent
      },
      {
      path: 'cart',
      component: ShoppingCartComponent
      }
      ,
      {
      path: 'check-out',
      component: CheckOutComponent,
      canActivate:[AuthGuard]
      }
  ])
  ]
})
export class ShopModule { }
