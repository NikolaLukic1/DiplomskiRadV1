import { Injectable } from '@angular/core';
import { IUser } from '../shared/models/user';
import { Role } from '../shared/models/role';
import { AccountService } from '../account/account.service';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class AuthService {
    private user: IUser;
    private userRole: string;
    private isAuthorizedUser : boolean;
    constructor(private accountService: AccountService){}

    isAuthorized() {
      this.accountService.currentUser$.subscribe(res =>{
        if(res) this.isAuthorizedUser = true;
        else this.isAuthorizedUser = false;
      }, error => console.log(error));

      return this.isAuthorizedUser;
    }

    hasRole(role: Role) {
       
      this.accountService.currentUser$.subscribe(
        auth => {
            if(auth){
            let jwtData = auth.token.split('.')[1];
            let decodedJwtJsonData = window.atob(jwtData);
            let decodedJwtData = JSON.parse(decodedJwtJsonData);
            this.userRole = decodedJwtData.role;
            }
        }, error => console.log(error));
      
        return this.isAuthorized() && this.userRole === role;
    }
}
