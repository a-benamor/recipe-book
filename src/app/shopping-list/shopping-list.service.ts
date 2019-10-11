import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
// @ts-ignore
import {Subject, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromShoppingListReducer from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';


@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  // ingredientChanged = new EventEmitter<Ingredient[]>();
  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 10),
    new Ingredient('Oranges', 20),
  ];

  constructor(private store: Store<fromShoppingListReducer.ApplicationStateType>) { }

  getIngredients() {
     return this.ingredients.slice();
   // return this.ingredients ;
  }

  addIngredient(ingredient: Ingredient) {
    this.store.dispatch(new ShoppingListActions.AddIngredientAction(ingredient));
  }

  addListOfIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(... ingredients);
    // this.ingredientChanged.emit(this.ingredients.slice());
    this.ingredientChanged.next(this.ingredients.slice());
  }

  getIngredient(index: number) {
    let ingredient: Ingredient = null;
    this.store.select('shoppingList').subscribe((applicationState) => {
      ingredient = applicationState.ingredients[index];
    });
    return ingredient;
  }
  updateIngredient(index: number, newIngredient: Ingredient) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredientAction({index, ingredient: newIngredient}));
  }

  deleteIngredient(index: number) {
    this.store.dispatch(new ShoppingListActions.DeleteIngredientAction(index));
  }
}
