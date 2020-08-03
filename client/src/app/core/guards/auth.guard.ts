import { Role } from './../../shared/models/role';
import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../../account/account.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  role: string;
  nesto: boolean;

  constructor(private accountService: AccountService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(auth => {
        if (auth) {
          if(state.url.toString() === '/products/new'){
            //token data  
            let token = localStorage.getItem('token').split('.')[1];
            let decodedJwtData = JSON.parse(window.atob(token));
            let role = decodedJwtData.role;
            
            if(role == 'Administrator') return true;
            else this.router.navigate(['/forbidden'], {queryParams: {returnUrl: state.url}});
          }
          
          return true;
        }

        this.router.navigate(['account/login'], {queryParams: {returnUrl: state.url}});
      })
    );
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    
    
    if (localStorage.getItem('token') == null) {
       this.router.navigateByUrl('/forbidden'); 
        return false;
    }
    
    let token = localStorage.getItem('token').split('.')[1];
    let decodedJwtData = JSON.parse(window.atob(token));
    let role = decodedJwtData.role;

    const roles = route.data && route.data.roles as Role[];
    if (roles && !roles.some(r => role == r)) {
      this.router.navigateByUrl('/forbidden'); 
      return false;
    }

    return true;
}

}
