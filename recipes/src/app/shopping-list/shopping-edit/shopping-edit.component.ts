import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Ingredient } from "../../shared/ingredient.model";

import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("nameInput") nameRef: ElementRef;
  @ViewChild("amountInput") amountRef: ElementRef;
  
  constructor(private listService: ShoppingListService) { }

  ngOnInit() {
  }
  
  addItem() {
    const ingName = this.nameRef.nativeElement.value;
    const ingAmount = this.amountRef.nativeElement.value;
    const item = new Ingredient(ingName, ingAmount);
    
    this.listService.ingredientAdded.emit(item);
  }
  
  deleteItem() {
    
  }
  
  clearForm() {
    
  }
}
