import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from './recipe.model';
import {Store} from '@ngrx/store';
import * as fromAppReducer from '../store/app.reducer';
import * as RecipesActions from './store/recipes.actions';
import {Actions, ofType} from '@ngrx/effects';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(private store: Store<fromAppReducer.ApplicationStateType>,
              private actions$: Actions) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {
    this.store.dispatch(new RecipesActions.FetchRecipesAction());
    return this.actions$.pipe(
      ofType(RecipesActions.SET_RECIPES),
      take(1),
    );
  }
}
