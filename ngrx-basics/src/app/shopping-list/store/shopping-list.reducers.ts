import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';

export interface AppState {
  shoppingList: State;
}

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

// must use function keyword. Two args will automatically be passed into the funtion by ngrx
export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  // return the new state of the application in here
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state, // expands all properties of existing object to include here
        ingredients: [...state.ingredients, action.payload] // note es6 syntax
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    case ShoppingListActions.UPDATE_INGREDIENT:
      const oldIngredient = state.ingredients[state.editedIngredientIndex]; // use action & payload
      const updatedIngredient = { // new object so you don't override existing ingredient
        ...oldIngredient,
        ...action.payload.ingredient // will override properties of the old ingredient
      };
      const existingIngredients = [...state.ingredients];

      existingIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: existingIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      const existIngredients = [...state.ingredients];

      existIngredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: existIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case ShoppingListActions.START_EDIT:
      const editingIngredient = {...state.ingredients[action.payload]}; // immutable way

      return {
        ...state,
        editedIngredient: editingIngredient,
        editedIngredientIndex: action.payload
      };

    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    default:
      return state;
  }
}
