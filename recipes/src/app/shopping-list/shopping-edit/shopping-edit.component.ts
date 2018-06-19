import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";

import { Subscription } from "rxjs";

import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f") editForm: NgForm;
  
  editingSubscription: Subscription;
  editMode = false;
  itemEditingIdx: number;
  itemEditing: Ingredient;
  
  constructor(private listService: ShoppingListService) { }

  ngOnInit() {
    this.editingSubscription = this.listService.startedEditing.subscribe(
      (idx: number) => {
        this.itemEditingIdx = idx;
        this.editMode = true;
        this.itemEditing = this.listService.getIngredient(idx);
        
        this.editForm.setValue({
          name: this.itemEditing.name,
          amount: this.itemEditing.amount
        });
      }
    );
  }
  
  ngOnDestroy() {
    this.editingSubscription.unsubscribe();
  }
  
  onSubmit(form: NgForm) {
    const value = form.value;
    const item = new Ingredient(value.name, value.amount);
    
    if (this.editMode) {
      this.listService.updateIngredient( this.itemEditingIdx, item);
    } else {
      this.listService.add(item);
    }
    
    this.clearForm();
  }
  
  deleteItem() {
    this.listService.deleteIngredient( this.itemEditingIdx );
    this.clearForm();
  }
  
  clearForm() {
    this.editForm.reset();
    this.editMode = false;
  }
}
