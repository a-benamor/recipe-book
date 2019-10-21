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
    case RecipeAction.ADD_RECIPE: {
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    }
    case RecipeAction.UPDATE_RECIPE: {
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe
      }
      const updatedRecipes: Recipe[] = state.recipes;
      updatedRecipes[action.payload.index] = updatedRecipe;

      return {
        ...state,
        recipes: [...updatedRecipes]
      };
    }
    case RecipeAction.DELETE_RECIPE: {
      return {
        ...state,
        recipes: state.recipes.filter((curRecipe, curIndex) => {
          return curIndex !== action.payload;
        })
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
