import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminComponent } from './admin.component';
import { AdminPriceComponent } from './admin-price/admin-price.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminOrderDetailsComponent } from './admin-order-details/admin-order-details.component';



@NgModule({
  declarations: [AdminOrdersComponent, AdminComponent, AdminPriceComponent, AdminOrderDetailsComponent],
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      {
      path: '',
      pathMatch: 'full',
      component: AdminComponent
      },
      {
      path: 'price',
      component: AdminPriceComponent
      },
      {
      path: 'orders',
      component: AdminOrdersComponent
      }
  ])
  ]
})
export class AdminModule { }
