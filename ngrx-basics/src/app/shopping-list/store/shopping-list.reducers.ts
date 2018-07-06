import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
}

// must use function keyword. Two args will automatically be passed into the funtion by ngrx
export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  // return the new state of the application in here
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state, // expands all properties of existing object to include here
        ingredients: [...state.ingredients, action.payload] // note es6 syntax
      };
    default:
      return state;
  }
}
