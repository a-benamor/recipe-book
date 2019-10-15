import {Action} from '@ngrx/store';
import {Ingredient} from '../../shared/ingredient.model';


export const ADD_INGREDIENT = '[Shopping list] Add ingredient';
export const UPDATE_INGREDIENT = '[Shopping list] Update ingredient';
export const DELETE_INGREDIENT = '[Shopping list] Delete ingredient';
export const ADD_INGREDIENTS = '[Shopping list] Add ingredients';
export const START_EDITING = '[Shopping list] Start edit';
export const STOP_EDITING = '[Shopping list] Stop edit';

export type ShoppingListActionsGenericType = AddIngredientAction | UpdateIngredientAction |
DeleteIngredientAction | AddIngredientsAction | StartEditingAction | StopEditingAction ;

export class AddIngredientAction implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class UpdateIngredientAction implements Action {
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class DeleteIngredientAction implements Action {
  readonly type = DELETE_INGREDIENT;
  constructor() {}
}

export class AddIngredientsAction implements Action {
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[] ) {}
}

export class StartEditingAction implements Action {
  readonly type = START_EDITING;
  constructor(public payload: number) {}
}

export class StopEditingAction implements Action {
  readonly type = STOP_EDITING;
}
