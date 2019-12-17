import { Component, OnInit } from '@angular/core';
import { faCoffee, faHamburger, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.css']
})
export class HomeNavComponent implements OnInit {
  faCoffee = faCoffee;
  faHamburger = faHamburger;
  faShoppingCart = faShoppingCart;
  constructor() { }

  ngOnInit() {
  }

}
