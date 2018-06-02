import { Component, OnInit, Input, EventEmitter } from '@angular/core';

import { Recipe } from "../../recipe.model";
import { RecipeService } from "../../recipe.service";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  // Remember, you need the @Input decorator to access data from the outside
  // from one template to another
  @Input() recipe: Recipe;
  
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }
  
  onSelect() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }

}
