// must use the following imports: 
import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
  // w/out square brackets = element selector. with = as an attribute
  selector: "[appHighlight]"
})
export class BasicHighlightDirective implements OnInit {
  // private: makes it property & sets it when constructor called
  constructor(private elementRef: ElementRef) { }
  
  ngOnInit() {
    // elementRef is set in contructor function
    this.elementRef.nativeElement.style.backgroundColor = "green";
  }
}