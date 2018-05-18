import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { Ingredient } from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("nameInput") nameRef: ElementRef;
  @ViewChild("amountInput") amountRef: ElementRef;
  
  @Output() itemAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }
  
  addItem() {
    const ingName = this.nameRef.nativeElement.value;
    const ingAmount = this.amountRef.nativeElement.value;
    const item = new Ingredient(ingName, ingAmount);
    
    this.itemAdded.emit(item);
  }
  
  deleteItem() {
    
  }
  
  clearForm() {
    
  }

}
