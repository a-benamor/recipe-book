import {Ingredient} from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface StateType {
  ingredients: Ingredient[];
}

export interface ApplicationStateType {
  shoppingList: StateType;
}

const initialState: StateType = {
  ingredients: [
    new Ingredient('Apples', 10),
    new Ingredient('Oranges', 20),
  ],
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActionsGenericType) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          action.payload
        ],
      };
    }
    case ShoppingListActions.ADD_INGREDIENTS: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          ...action.payload,
        ]
      };
    }
    case ShoppingListActions.UPDATE_INGREDIENT: {
      const ingredintToUpdate = state.ingredients[action.payload.index];
      const updatedIngredient: Ingredient = {
        ...ingredintToUpdate,
        ...action.payload.ingredient,
      };
      const updatedIngredients: Ingredient[] = [...state.ingredients];
      updatedIngredients[action.payload.index] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
      };
    }
    case ShoppingListActions.DELETE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.filter((element: Ingredient, elementIndex: number) => {
          return elementIndex !== action.payload;
        })
      };
    }
    default: {
      return {...state };
    }
  }
}
