import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes.component';

import { AuthGuard } from '../auth/auth-guard.service';

const recipesRoutes: Routes = [
  // first one not path: 'recipes'; already defined in app-routing for lazy loading
  { path: '', component: RecipesComponent,
    children: [
      { path: '', component: RecipeStartComponent },
      // must come above :id
      { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [
    // don't call .forRoot() - only call that in the root AppModule
    RouterModule.forChild(recipesRoutes)
  ],
  exports: [RouterModule]
})
export class RecipesRoutingModule {
}
