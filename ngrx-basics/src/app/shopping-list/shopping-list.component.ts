import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit{
  // new type, instead of just Ingredients[] - also change in template using async pipe
  shoppingListState: Observable<{ingredients: Ingredient[]}>;

  // provide the store service here; must provide a type for this.
  constructor(private slService: ShoppingListService, 
              private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList'); // returns observable
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }
}
