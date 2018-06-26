import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DropdownDirective } from "./dropdown.directive";

@NgModule({
  declarations: [
    DropdownDirective
  ],
  exports: [
    CommonModule, // don't need to import in order to export
    DropdownDirective
  ]
})
export class SharedModule {}