import {Ingredient} from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface ShoppingListStateType {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: ShoppingListStateType = {
  ingredients: [
    new Ingredient('Apples', 10),
    new Ingredient('Oranges', 20),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

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
      const ingredintToUpdate = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient: Ingredient = {
        ...ingredintToUpdate,
        ...action.payload,
      };
      const updatedIngredients: Ingredient[] = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    }
    case ShoppingListActions.DELETE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.filter((element: Ingredient, elementIndex: number) => {
          return elementIndex !== state.editedIngredientIndex;
        }),
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    }
    case ShoppingListActions.START_EDITING: {
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] }
      };
    }
    case ShoppingListActions.STOP_EDITING: {
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    }
    default: {
      return {...state };
    }
  }
}
