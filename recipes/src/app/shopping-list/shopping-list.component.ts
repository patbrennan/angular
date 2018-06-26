import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private listService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.listService.ingredients;
    this.subscription = this.listService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  editItem(idx: number) {
    // uses Subject so it can emit data & be listened to anywhere in the app
    this.listService.startedEditing.next(idx);
  }
}
