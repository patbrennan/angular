import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Recipe } from "../../recipe.model";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  // Remember, you need the @Input decorator to access data from the outside
  // from one template to another
  @Input() recipe: Recipe;
  
  @Output() recipeSelect = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }
  
  onSelect() {
    this.recipeSelect.emit();
  }

}
