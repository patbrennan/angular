import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [ // define which other modules this module uses
    BrowserModule, // this includes CommonModule - so use it here in AppModule
    FormsModule,
    HttpModule,
    AppRoutingModule, // import your custom module here.
    SharedModule,
    ShoppingListModule,
    AuthModule,
    CoreModule
  ],
  providers: [ // Don't forget to provide services here! This will be provided app-wide
  ],
  bootstrap: [AppComponent] // defines the root component
})
export class AppModule { }
