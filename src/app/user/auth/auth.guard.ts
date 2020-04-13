import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../../shared/services/user/user.service';
import { User } from 'src/app/shared/models/user/user';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: User;
  constructor(private router: Router, private userService : UserService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let cartId = this.userService.getUser();
    // this.getUser();
    if (cartId != null){
      let roles = next.data['permittedRoles'] as Array<string>;
      if(roles){
        if(this.userService.roleMatch(roles)) 
        return true;
        else{
          this.router.navigate(['/forbidden']);
          return false;
        }
      }
      return true;
    }
    else {
      this.router.navigate(['/user/login']);
      return false;
    }
  }
  getUser() {
    this.userService.users$.subscribe(res => {
        this.user = res;
      });
  }
}
