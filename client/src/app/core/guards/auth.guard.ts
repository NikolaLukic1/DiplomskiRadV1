import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../../account/account.service';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';
import { Role } from '../../shared/models/role';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  role: string;

  constructor(private accountService: AccountService, private router: Router, private authService: AuthService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(auth => {
        if (auth) {
          return true;
        }

        this.router.navigate(['account/login'], {queryParams: {returnUrl: state.url}});
      })
    );
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    console.log('test')
    if (!this.authService.isAuthorized()) {
       this.router.navigateByUrl('/forbidden'); 
        return false;
    }

    const roles = route.data && route.data.roles as Role[];
    if (roles && !roles.some(r => this.authService.hasRole(r))) {
      this.router.navigateByUrl('/forbidden'); 
      return false;
    }

    return true;
}

}
