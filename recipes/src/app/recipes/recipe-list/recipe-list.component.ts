import { Component, OnInit } from '@angular/core';

// must import models from the correct place
import { Recipe } from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("Old Fashioned", "A whisky cocktail from the early 1900's", "https://cdn.liquor.com/wp-content/uploads/2016/08/03142438/Most-Popular-Cocktail-Recipes-July-2016-bourbon-old-fashioned-720x378-social.jpg"),
    new Recipe("Manhattan", "Whiskey cocktail in martini glass", "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/09/manhattan-cocktail.jpg?itok=Vm4nj_gD")
  ];

  constructor() { }

  ngOnInit() {
  }

}
