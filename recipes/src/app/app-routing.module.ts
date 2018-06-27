import { NgModule } from '@angular/core';

import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './core/home/home.component';

// import { AuthGuard } from './auth/auth-guard.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  // lazy loading on visit = loadChildren: path/to/file#ModuleClassName
  { path: 'recipes', loadChildren: './recipes/recipe.module#RecipesModule'},
  // { path: '', redirectTo: '/recipes', pathMatch: 'full' }
];

@NgModule({
  imports: [
    // preload all lazy-loaded modules after the app has been loaded using preloadingStrategy
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [ RouterModule ] // exports the configured router
})
export class AppRoutingModule {}
