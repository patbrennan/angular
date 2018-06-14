import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";

import { ShoppingListService } from "../../shopping-list/shopping-list.service";
import { RecipeService } from "../recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private listService: ShoppingListService,
              private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params["id"];
        this.recipe = this.recipeService.findRecipe(this.id);
      }
    );
  }
  
  addToShoppingList(ingredients: Ingredient[]) {
    this.listService.ingredients.push(...ingredients);
  }
  
  toEditRecipe() {
    this.router.navigate(["edit"], {relativeTo: this.route});
    // this.router.navigate(["../", this.id, "edit"], {relativeTo: this.route});
  }
}
