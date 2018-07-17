import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class DataStorageService {
  recipesUrl: string = environment.firebaseAuthDomain;

  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    // const token = this.authService.getToken();
    // const urlParams = new HttpParams().append('auth', token);

    // essentially the same as the old version:
    // return this.httpClient.put(
    //   `${this.recipesUrl}/recipes.json`,
    //   this.recipeService.getRecipes(),
    //   {
    //     // observe: 'events', // can listen to events, like download/upload progress, sent, etc
    //     observe: 'body', // normal
    //     // headers: new HttpHeaders().set('Something', 'something else')
    //     params: urlParams
    // });

    const req = new HttpRequest(
      'PUT',
      `${this.recipesUrl}/recipes.json`,
      this.recipeService.getRecipes(),
      {
        reportProgress: true, // useful for upload/download progress
        // params: urlParams
      }
    );
    return this.httpClient.request(req); // need to return an observable
  }

  getRecipes() {
    // const token = this.authService.getToken();

    // tell httpClient what type of data we're getting back on the get method:
    // this.httpClient.get<Recipe[]>(`${this.recipesUrl}/recipes.json?auth=${token}`)
    this.httpClient.get<Recipe[]>(`${this.recipesUrl}/recipes.json`, {
      observe: 'body', // gives full response, not just body
      responseType: 'json', // default json, can change here
    })
      .map(
        (recipes) => { // default client will extract body of response;
          // const recipes: Recipe[] = response.json(); <= no longer needed; assumes json data
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
