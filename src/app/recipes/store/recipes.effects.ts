import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import * as RecipesActions from './recipes.actions';
import {map, switchMap, tap} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {SetRecipesAction} from './recipes.actions';
import {HttpClient} from '@angular/common/http';

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
      return new SetRecipesAction(recipes);
    }),
  );

  constructor(private actions$: Actions, private httpClient: HttpClient) {}
}
