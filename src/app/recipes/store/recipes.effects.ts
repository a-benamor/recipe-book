import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import * as RecipesActions from './recipes.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as fromAppReducer from '../../store/app.reducer';

@Injectable()
export class RecipesEffects {
  @Effect()
  getRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.httpClient.get< Recipe[] >('https://ng-recipe-app-5ee93.firebaseio.com/recipes.json');
    }),
    map((recipes: Recipe[]) => {
      return recipes.map(
        (recipe) => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []} ;
        }
      );
    }),
    map((recipes: Recipe[]) => {
      return new RecipesActions.SetRecipesAction(recipes);
    }),
  );

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([storeActionData, recipesState]) => {
      return this.httpClient.put('https://ng-recipe-app-5ee93.firebaseio.com/recipes.json', recipesState.recipes);
    })
  );

  constructor(private actions$: Actions, private httpClient: HttpClient,
              private store: Store<fromAppReducer.ApplicationStateType>) {}
}
