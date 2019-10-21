import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from './recipe.model';
import {Store} from '@ngrx/store';
import * as fromAppReducer from '../store/app.reducer';
import * as RecipesActions from './store/recipes.actions';
import {Actions, ofType} from '@ngrx/effects';
import {map, switchMap, take} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(private store: Store<fromAppReducer.ApplicationStateType>,
              private actions$: Actions) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {
    return this.store.select('recipes').pipe(
      take(1),
      map(recipesState => {
        return recipesState.recipes;
      }),
      switchMap(recipes => {
        if (recipes.length === 0 ) {
          this.store.dispatch(new RecipesActions.FetchRecipesAction());
          return this.actions$.pipe(
            ofType(RecipesActions.SET_RECIPES),
            take(1),
          );
        } else {
          return of(recipes);
        }
      })
    );

  }
}
