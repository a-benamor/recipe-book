import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {exhaustMap, map, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromAppReducer from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private store: Store<fromAppReducer.ApplicationStateType>) { }
  // we will execute this method before the request leaves the application to reach the server : Outgoing request
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => {
        return authState.user;
      }),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        } else {
          const requestWithToken = req.clone({
            params: req.params.append('auth', user.token)
          });
          return next.handle(requestWithToken);
        }

    }));
  }
}
