import { Component, OnInit } from '@angular/core';
import { faCoffee, faHamburger, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { StoreCartService } from '../shop/services/store-cart.service';
import { Cart } from '../shop/model/cart';
import { UserService } from '../user/services/user.service';
import { User } from '../user/model/user';
import { Router } from '@angular/router';

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
  
  user: User;
  constructor(private storeService: StoreCartService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getQuantity();
    this.onload();
    this.isAuth();
  }
  getQuantity() {
    this.storeService.currentMessage.subscribe(quantity => this.quantity = quantity);
  }
  onload() {
    let tawo = localStorage.getItem('tawo');
    if (tawo)  {
      this.user = JSON.parse(localStorage.getItem('tawo'));
      this.userService.changeUser(this.user);
    }
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tawo');
    this.userService.changeUser(null);
  }
  isAuth() {
    this.userService.users$.subscribe(res => {
      this.user = res;
    });
  }
}
