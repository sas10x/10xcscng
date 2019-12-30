import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShopComponent } from './shop.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [ShopComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule.forChild([
      {
      path: '',
      pathMatch: 'full',
      component: ShopComponent
      }
  ])
  ]
})
export class ShopModule { }
