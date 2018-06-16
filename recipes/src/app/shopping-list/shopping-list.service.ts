import { Injectable } from '@angular/core';

import { Ingredient } from "../shared/ingredient.model";

import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredients: Ingredient[] = [
    new Ingredient("Bourbon/Whiskey", 2),
    new Ingredient("Bitters", 3)
  ];
  
  ingredientsChanged = new Subject<Ingredient[]>();
  
  add(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next( this.ingredients.slice() );
  }
  
  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next( this.ingredients.slice() );
  }
  
  // TODO?: Add accessor method w/slice to preserve original ingredients array
}
