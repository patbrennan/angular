// ATTRIBUTE DIRECTIVES

import { Directive, Renderer2, ElementRef, OnInit, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = "transparent";
  @Input() highlightColor: string = "cyan";
  
  // pass which prop of hostelement we want to bind as argument
  @HostBinding("style.backgroundColor") backgroundColor: string;
  
  // note the "Renderer2" object type
  constructor(private elRef: ElementRef, private renderer: Renderer2) { }
  
  ngOnInit() {
    // there are more methods than just setStyle() for the render object
    // optional 4th argument = tags
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.defaultColor;
  }
  
  // Adds decorator that creates listener - will execute this method given the 
  // supplied event name parameter (can even be custom events)
  // receives event as argument
  @HostListener("mouseenter") changeBackground(data: Event) {
    // renderer code:
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    // @HostBinding code:
    this.backgroundColor = this.highlightColor;
  }
  
  @HostListener("mouseleave") resetBackground(data: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = this.defaultColor;
  }
  
}
