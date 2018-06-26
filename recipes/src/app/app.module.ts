import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from "./app-routing.module";
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { RecipeService } from "./recipes/recipe.service";
import { DataStorageService } from "./shared/data-storage.service";
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { RecipesModule } from './recipes/recipe.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [ // define which other modules this module uses
    BrowserModule, // this includes CommonModule - so use it here in AppModule
    FormsModule,
    HttpModule,
    AppRoutingModule,
    RecipesModule, // import your custom module here.
    SharedModule,
    ShoppingListModule
  ],
  providers: [ // Don't forget to provide services here! This will be provided app-wide
    // leave RecipeService here because it's used in other parts of the app.
    RecipeService, // remember that this uses one instance of each service
    DataStorageService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent] // defines the root component
})
export class AppModule { }
