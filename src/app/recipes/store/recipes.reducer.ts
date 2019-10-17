import {Recipe} from '../recipe.model';
import * as RecipeAction from './recipes.actions';

export interface RecipesStateType {
  recipes: Recipe[];
}

const recipesInitialState: RecipesStateType = {
  recipes: [],
};

export function recipesReducer(state = recipesInitialState, action: RecipeAction.RecipeActionType) {
  switch (action.type) {
    case RecipeAction.SET_RECIPES: {
      return {
        ...state,
        recipes: [...action.payload]
      };
    }
    case RecipeAction.FETCH_RECIPES: {
      return {
        ...state
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
