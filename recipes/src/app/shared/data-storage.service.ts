import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import { map } from "rxjs/operators";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable()
export class DataStorageService {
  constructor(private http: Http,
              private recipeService: RecipeService) {
  }
  
  storeRecipes() {
    // target a new node called "recipes"
    return this.http.put("https://ng-recipe-book-f46cb.firebaseio.com/recipes.json", this.recipeService.getRecipes());
  }
  
  getRecipes() {
    return this.http.get("https://ng-recipe-book-f46cb.firebaseio.com/recipes.json")
      .pipe(
        map( // transform response we get back to standardize data
          (response: Response) => {
            const recipes: Recipe[] = response.json();
            
            for (let recipe of recipes) { // ensure always contains ingredients[]
              if (!recipe["ingredients"]) {
                console.log(recipe);
                recipe["ingredients"] = [];
              }
            }
            return recipes;
          }
        )
      )
      .subscribe( // subscribe to immediately fire this action
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}