import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private http: Http,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getIdToken();
    const url = `https://ng-recipe-book-f46cb.firebaseio.com/recipes.json?auth=${token}`;

    // target a new node called "recipes"
    return this.http.put(url, this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getIdToken();
    const url = `https://ng-recipe-book-f46cb.firebaseio.com/recipes.json?auth=${token}`;

    return this.http.get(url).pipe(
      map( // transform response we get back to standardize data
        (response: Response) => {
          const recipes: Recipe[] = response.json();

          for (let recipe of recipes) { // ensure always contains ingredients[]
            if (!recipe['ingredients']) {
              console.log(recipe);
              recipe['ingredients'] = [];
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