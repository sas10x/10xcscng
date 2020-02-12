import { Component, OnInit } from '@angular/core';
import { faCoffee, faHamburger, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { StoreCartService } from '../shop/services/store-cart.service';
import { Cart } from '../shop/model/cart';

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.css']
})
export class HomeNavComponent implements OnInit {
  faCoffee = faCoffee;
  faHamburger = faHamburger;
  faShoppingCart = faShoppingCart;
  faUser = faUser;
  carts: Cart[];
  total: 0;
  quantity = 0;
  navbarCollapsed: boolean;
  auth: boolean = true;
  constructor(private storeService: StoreCartService) { }

  ngOnInit() {
    this.storeService.currentMessage.subscribe(quantity => this.quantity = quantity);
  }
  logout() {

  }
  authcheck() {
    if ((localStorage.getItem('token') != null) && (this.auth = false))
    {
      this.auth = true;
    }
  }
}
