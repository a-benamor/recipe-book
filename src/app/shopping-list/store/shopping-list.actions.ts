import {Action} from '@ngrx/store';
import {Ingredient} from '../../shared/ingredient.model';


export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';

export type ShoppingListActionsGenericType = AddIngredientAction | UpdateIngredientAction |
DeleteIngredientAction | AddIngredientsAction ;

export class AddIngredientAction implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class UpdateIngredientAction implements Action {
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload: {index: number, ingredient: Ingredient }) {}
}

export class DeleteIngredientAction implements Action {
  readonly type = DELETE_INGREDIENT;
  constructor(public payload: number) {}
}

export class AddIngredientsAction implements Action {
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[] ) {}
}

