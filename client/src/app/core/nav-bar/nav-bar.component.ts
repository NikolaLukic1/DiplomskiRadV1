import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from 'src/app/shared/models/basket';
import { IUser } from 'src/app/shared/models/user';
import { AccountService } from 'src/app/account/account.service';
import { map } from 'rxjs/internal/operators/map';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  basket$: Observable<IBasket>;
  currentUser$: Observable<IUser>;
  userRole: string = null;

  constructor(private basketService: BasketService, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.currentUser$ = this.accountService.currentUser$;
    this.getRoleFromToken();
  }

  logout() {
    this.accountService.logout();
    this.userRole = '';
    this.router.navigateByUrl('/');
  }

  getRoleFromToken() {
    return this.accountService.currentUser$.subscribe(
      user => {
        if(user){
        let jwtData = user.token.split('.')[1];
        let decodedJwtJsonData = window.atob(jwtData);
        let decodedJwtData = JSON.parse(decodedJwtJsonData);
        this.userRole = decodedJwtData.role;
        console.log(this.userRole);
        }
      });
    
  }
}
