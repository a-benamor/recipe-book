import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [];

  constructor() { }

  getIngredients() {
     return this.ingredients.slice();
   // return this.ingredients ;
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.emit(this.ingredients.slice());
  }

  addListOfIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(... ingredients);
    this.ingredientChanged.emit(this.ingredients.slice());
  }
}
