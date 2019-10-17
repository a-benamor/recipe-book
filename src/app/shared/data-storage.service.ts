import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromAppReducer from '../store/app.reducer';
import * as  fromRecipesReducer from '../recipes/store/recipes.reducer';
import {SetRecipesAction} from '../recipes/store/recipes.actions';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private httpClient: HttpClient, private recipeService: RecipeService,
              private store: Store<fromAppReducer.ApplicationStateType>) { }


  storeRecipes() {
    let recipes: Recipe[];
    this.store.select('recipes').subscribe((recipesState: fromRecipesReducer.RecipesStateType) => {
      recipes = recipesState.recipes;
    })
    this.httpClient.put('https://ng-recipe-app-5ee93.firebaseio.com/recipes.json', recipes).subscribe();
  }

  getRecipes() {
    // we return an observable
    return this.httpClient.get< Recipe[] >('https://ng-recipe-app-5ee93.firebaseio.com/recipes.json')
      .pipe(map(
        (response: Recipe[]) => {
          return response.map(
            (recipe) => {
              return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []} ;
            }
          );
        }) , tap(
        (response) => {
          this.store.dispatch(new SetRecipesAction(response));
        }
        )
      );
  }
}
