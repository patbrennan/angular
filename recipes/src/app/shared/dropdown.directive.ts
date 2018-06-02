// functionality: want to add functionality that toggles "open" css class when clicked

import { Directive, HostBinding, HostListener, OnInit } from "@angular/core";

@Directive({
  selector: "[appDropdown]"
})
export class DropdownDirective implements OnInit {
  @HostBinding("class.open") isOpen: boolean = false;
  
  @HostListener("click") toggleOpen() {
    this.isOpen = !this.isOpen;
  }
  
  ngOnInit() {}
}