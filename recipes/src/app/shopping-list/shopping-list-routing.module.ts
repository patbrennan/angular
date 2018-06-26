import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShoppingListComponent } from './shopping-list.component';

const listRoutes: Routes = [
  { path: 'shopping-list', component: ShoppingListComponent,
    children: [
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(listRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShoppingListRoutingModule { }
