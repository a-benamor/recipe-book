import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {map, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private route: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe(
      take(1),
      map(
      user => {
        const isAuthenticated = !!user ;
        if (isAuthenticated) {
          return true ;
        }
        return this.route.createUrlTree(['/auth']);
      }
    ));
  }

  canActivateOld(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('can cactivate method: first')
    return this.authService.user.pipe(map(
      user => {
        return !!user ;
      }
    ), tap(
      isAuthenticated => {
        if (! isAuthenticated) {
          this.route.navigate(['/auth']);
        }
      }
    ));
  }
}
