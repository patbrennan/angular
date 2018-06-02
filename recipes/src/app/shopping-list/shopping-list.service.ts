import { Injectable, EventEmitter } from '@angular/core';

import { Ingredient } from "../shared/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredients: Ingredient[] = [
    new Ingredient("Bourbon/Whiskey", 2),
    new Ingredient("Bitters", 3)
  ];
  
  ingredientAdded = new EventEmitter<Ingredient>();
  
  constructor() { }
  
  add(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
  
  // TODO?: Add accessor method w/slice to preserve original ingredients array
}
