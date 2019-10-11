import { Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
// @ts-ignore
import {Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromShoppingListReducer from '../shopping-list/store/shopping-list.reducer';
import {AddIngredientsAction} from '../shopping-list/store/shopping-list.actions';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

/* private recipes: Recipe[] = [
    new Recipe( 'Tasty Shnietzel', 'A supet tasty shnietzel, just awesome',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG', [
        new Ingredient('Meat', 1),
        new Ingredient('Frensh fries', 20)

      ]),
    new Recipe( 'Big Fat Burger', 'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg', [
      new Ingredient('Buns', 1),
      new Ingredient('Meat', 1)
    ])
  ];*/

  private recipes: Recipe[] = [] ;

  recipesChanged = new Subject< Recipe[] >();

  constructor(private shoppingListService: ShoppingListService,
              private store: Store<fromShoppingListReducer.ApplicationStateType>) { }

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
