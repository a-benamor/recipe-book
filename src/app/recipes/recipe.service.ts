import { Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
// @ts-ignore
import {Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import {AddIngredientsAction} from '../shopping-list/store/shopping-list.actions';
import * as fromAppReducer from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [] ;

  recipesChanged = new Subject< Recipe[] >();

  constructor(private store: Store<fromAppReducer.ApplicationStateType>) { }

  getRecipes() {
    return this.recipes.slice() ;
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new AddIngredientsAction(ingredients));
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
   this.recipes[index] = newRecipe;
   this.recipesChanged.next(this.recipes.slice());
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipes(recipes: Recipe[] ) {
    this.recipes = recipes ;
    this.recipesChanged.next(this.recipes.slice()) ;
  }
}
