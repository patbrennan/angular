import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

import * as Feature from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

// also gets props of AppState so it is aware of all app state
export interface FeatureState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ]
};

export function recipeReducer(state = initialState, action: Feature.Actions) {

  switch (action.type) {
    case Feature.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };

    case Feature.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };

    case Feature.UPDATE_RECIPE:
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.newRecipe
      };
      const recipes = [...state.recipes];

      recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      };

    case Feature.DELETE_RECIPE:
      const deletedRecipes = [...state.recipes];
      deletedRecipes.splice(action.payload, 1);

      return {
        ...state,
        recipes: deletedRecipes
      };

      default:
        return state;
  }
}
