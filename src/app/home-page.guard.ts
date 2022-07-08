import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { skipWhile, take, tap } from 'rxjs/operators';

import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomePageGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.signedin$.pipe(
      //only return true or false, not null
      skipWhile(val => val === null),
      //take exactly 1 value and then assume complete
      take(1),
      tap((authenticated) => {
        if (!authenticated) {
          this.router.navigateByUrl('/signin');
        } else {
          this.router.navigateByUrl('/inbox');
        }
      })
    );
  }
  
}
