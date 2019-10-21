import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import * as ApplicationReducerGlobal from '../store/app.reducer';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private route: Router,
              private store: Store<ApplicationReducerGlobal.ApplicationStateType> ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.store.select('auth').pipe(
      take(1),
      map((authState) => {
        return authState.user;
      }),
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

}
