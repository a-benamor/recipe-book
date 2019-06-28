import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

 private recipes: Recipe[] = [
    new Recipe('Tasty Shnietzel', 'A supet tasty shnietzel, just awesome',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG', [
        new Ingredient('Meat', 1),
        new Ingredient('Frensh fries', 20)

      ]),
    new Recipe('Big Fat Burger', 'What else you need to say?', 'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg', [
      new Ingredient('Buns', 1),
      new Ingredient('Meat', 1)
    ])
  ];

  private recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice() ;
  }
  getRecipeSelected() {
    return this.recipeSelected ;
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addListOfIngredients(ingredients);
  }
}
