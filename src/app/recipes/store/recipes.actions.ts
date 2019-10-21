import {Action} from '@ngrx/store';
import {Recipe} from '../recipe.model';

export const SET_RECIPES = '[Recipes] Set recipes';
export const ADD_RECIPE = '[Recipes] Add recipe';
export const UPDATE_RECIPE = '[Recipes] Update recipe';
export const DELETE_RECIPE = '[Recipes] Delete recipe';
export const FETCH_RECIPES = '[Recipes] Fetch recipes';
export const STORE_RECIPES = '[Recipes] Store recipes';

export type RecipeActionType = SetRecipesAction | AddRecipeAction
  | UpdateRecipeAction | DeleteRecipeAction | FetchRecipesAction | StoreRecipesAction;


export class AddRecipeAction implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}

export class UpdateRecipeAction implements Action {
  readonly type = UPDATE_RECIPE;
  constructor(public payload: {index: number, newRecipe: Recipe} ) {}
}

export class DeleteRecipeAction implements Action {
  readonly type = DELETE_RECIPE;
  constructor(public payload: number) {}
}
export class SetRecipesAction implements Action {
  readonly type = SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}
export class StoreRecipesAction implements Action {
  readonly type = STORE_RECIPES;
}

export class FetchRecipesAction implements Action {
  readonly type = FETCH_RECIPES;
}
