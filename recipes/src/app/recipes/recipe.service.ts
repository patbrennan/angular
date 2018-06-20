// https://ng-recipe-book-f46cb.firebaseio.com/
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new Subject<Recipe[]>();
  
  private recipes: Recipe[] = [
    new Recipe(
      "Old Fashioned", 
      "A whisky cocktail from the early 1900's", 
      "https://cdn.liquor.com/wp-content/uploads/2016/08/03142438/Most-Popular-Cocktail-Recipes-July-2016-bourbon-old-fashioned-720x378-social.jpg",
      [
        new Ingredient("bourbon", 2),
        new Ingredient("bitters", 1),
        new Ingredient("simple syrup", 1)
      ]
    ),
    new Recipe(
      "Manhattan",
      "Whiskey cocktail in martini glass",
      "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/09/manhattan-cocktail.jpg?itok=Vm4nj_gD",
      [
        new Ingredient("bourbon", 2),
        new Ingredient("bitters", 1),
        new Ingredient("vermouth", 1)
      ]
    )
  ];
  
  constructor() {
  }
  
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  
  getRecipes() {
    // returns new array that is exact copy - won't modify original array
    return this.recipes.slice();
  }
  
  findRecipe(idx: number): Recipe {
    return this.recipes[idx];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push( recipe );
    // must 
    this.recipesChanged.next(this.recipes.slice());
  }
  
  updateRecipe(idx: number, newRecipe: Recipe) {
    this.recipes[idx] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  
  deleteRecipe(idx: number) {
    this.recipes.splice(idx, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
