import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShopComponent } from './shop.component';



@NgModule({
  declarations: [ShopComponent],
  imports: [
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
