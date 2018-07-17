import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as RecipeActions from '../store/recipe.actions';
import { Recipe } from '../recipe.model';
import * as fromRecipe from '../store/recipe.reducers';
import { environment } from '../../../environments/environment';

@Injectable()
export class RecipeEffects {
  private reqUrl = environment.firebaseAuthDomain;

  @Effect()
  recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap((action: RecipeActions.FetchRecipes) => {
      return this.httpClient.get<Recipe[]>(`${this.reqUrl}/recipes.json`, {
        observe: 'body',
        responseType: 'json'
      });
    })
    .map(
      (recipes) => {
        console.log(recipes);
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes
        };
      }
    );

  @Effect({dispatch: false}) // don't dispatch action
  recipeStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPES)
    // allows combining of one observable w/another:
    .withLatestFrom(this.store.select('recipes')) // takes observable to combine w/action
    .switchMap(([action, state]) => { // [action, state] is what we get back from above
      const req = new HttpRequest('PUT', `${this.reqUrl}/recipes.json`, state.recipes, {reportProgress: true});
      return this.httpClient.request(req);
    });

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromRecipe.FeatureState>) {}
}
