import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import {ActionReducerMap} from '@ngrx/store';
import * as fromShoppingListReducer from '../shopping-list/store/shopping-list.reducer';
import * as fromAuthReducer from '../auth/store/auth.reducer';
import * as fromRecipesReducer from '../recipes/store/recipes.reducer';

export interface ApplicationStateType {
  shoppingList: fromShoppingList.ShoppingListStateType;
  auth: fromAuthReducer.AuthStateType;
  recipes: fromRecipesReducer.RecipesStateType
}

// @ts-ignore
export const appReducer: ActionReducerMap<ApplicationStateType> = {
  shoppingList: fromShoppingListReducer.shoppingListReducer,
  auth: fromAuthReducer.authReducer,
  recipes: fromRecipesReducer.recipesReducer,
}
