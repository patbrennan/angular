import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth-guard.service';

import { ShoppingListService } from '../shopping-list/shopping-list.service';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    SharedModule, // need for header functionality
    AppRoutingModule // need for header links
  ],
  exports: [
    AppRoutingModule, // need in all modules for routing, so export
    HeaderComponent, // <app-header> selector used in app-component

  ],
  providers: [
    // leave RecipeService here because it's used in other parts of the app.
    RecipeService, // remember that this uses one instance of each service
    DataStorageService,
    AuthService,
    ShoppingListService,
    AuthGuard, // could potentially only use this in recipe-routing; would also be lazily loaded
  ]
})
export class CoreModule {}
