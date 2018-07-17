import { Component, OnInit } from '@angular/core';

// import { Recipe } from "./recipe.model";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // subscribe to be informed about any recipe selection changes
    // recipeSelected is an event emitter in recipe service:
    // this.recipeService.recipeSelected.subscribe(
    //   (recipe: Recipe) => { 
    //     this.activeRecipe = recipe; 
    //   }
    // );
  }
}
