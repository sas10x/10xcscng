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
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';





@NgModule({
  declarations: [ShopComponent, ShoppingCartComponent, CheckOutComponent, ShippingFormComponent, OrderSuccessComponent, MyOrdersComponent, OrderDetailsComponent],
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
      },
      {
      path: 'check-out',
      component: CheckOutComponent,
      canActivate:[AuthGuard]
      }
      ,
      {
      path: 'success',
      component: OrderSuccessComponent,
      canActivate:[AuthGuard]
      }
      ,
      {
      path: 'myorders',
      component: MyOrdersComponent,
      canActivate:[AuthGuard]
      }
  ])
  ]
})
export class ShopModule { }
