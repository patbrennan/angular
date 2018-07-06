// could technically add these actions to the reducers file to reduce files, but this clearly 
// keeps them separate
import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

// value up to you; may want to use later in your app, so we export these actions
export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  
  constructor(public payload: Ingredient) { }
}

export type ShoppingListActions = AddIngredient;
