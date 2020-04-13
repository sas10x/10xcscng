import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from '../../shared/services/user/user.service';
import { User } from 'src/app/shared/models/user/user';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    user: User;
    constructor(private router: Router, private userService: UserService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.getUser();
        if (this.user != null) {
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this.user.token)
            });
            return next.handle(clonedReq).pipe(
                tap(
                    succ => { },
                    err => {
                        if (err.status == 401){
                            localStorage.removeItem('token');
                            this.router.navigateByUrl('/user/login');
                        }
                        else if(err.status == 403)
                        this.router.navigateByUrl('/user/forbidden');
                    }
                )
            )
        }
        else
            return next.handle(req.clone());
    }
    getUser() {
        this.userService.users$.subscribe(res => {
            this.user = res;
          });
    }
}