import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";

import { RecipeService } from "../recipe.service";
import { Recipe } from "../recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  
  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params["id"];
        this.editMode = !!params["id"];
        this.initForm();
      }
    );
  }
  
  private initForm() { // call whenever route params change; indicates page reload
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    
    if (this.editMode) {
      const currentRecipe = this.recipeService.findRecipe( this.id );
      recipeName = currentRecipe.name;
      recipeImgPath = currentRecipe.imagePath;
      recipeDescription = currentRecipe.description;
      
      if ( currentRecipe["ingredients"] ) {
        for (let ing of currentRecipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({ // use FormGroup because ing has name/amount
              "name": new FormControl(ing.name, Validators.required),
              "amount": new FormControl(ing.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }
    
    this.recipeForm = new FormGroup({
      "name": new FormControl(recipeName, Validators.required),
      "imagePath": new FormControl(recipeImgPath, Validators.required),
      "description": new FormControl(recipeDescription, Validators.required),
      "ingredients": recipeIngredients // already a FormArray object
    });
  }
  
  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value["name"],
    //   this.recipeForm.value["description"],
    //   this.recipeForm.value["imagePath"],
    //   this.recipeForm.value["ingredients"]
    // );
    
    // since the structure of the object in the form is the same as above,
    // we can use recipeForm.value instead of constructing the new Recipe manually
    
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.router.navigate(['/recipes', this.id]);
    } else {
      this.recipeService.addRecipe( this.recipeForm.value );
      this.router.navigate(['/recipes']);
    }
    
    
  }
  
  addIngredient() {
    // explicitly cast the type to Ts knows how to handle 
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        "name": new FormControl(null, Validators.required),
        "amount": new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }
  
  deleteIngredient(idx: number) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(idx);
  }
  
  cancelEdit() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
