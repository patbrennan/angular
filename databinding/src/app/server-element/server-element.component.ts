// notice we import "Input" so we can use as a decorator on a property
import { Component, OnInit, Input, ViewChild, ElementRef, ContentChild } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit {
  // property has a decorator so it can be exposed to the outside.
  @Input() element: {type: string, name: string, content: string};
  @Input() name: string;
  
  @ViewChild("heading") header: ElementRef;
  // get access to content from another component passed on via <ng-content>:
  @ContentChild("contentParagraph") paragraph: ElementRef;

  constructor() {
  }
  
  ngOnChanges(changes: SimpleChanges) {
    // only one that takes an argument
    // called after a bound input (@Input()) property changes
    console.log(changes)
  }

  ngOnInit() {
    // called once the component is intialized (not displayed) - object was created
    // not visible in the DOM yet
    console.log("Text Content of paragraph: " + this.paragraph.nativeElement.textContent); // not available yet here
  }
  
  ngDoCheck() {
    // run whenever change detection run; when the template is changed in any way
    // not just on IF something changes, but events as well - whenever it CHECKS
    // for changes
  }
  
  ngAfterContentInit() {
    // called after content (ng-content) has been projected into view- initialized
    console.log("Text Content of paragraph: " + this.paragraph.nativeElement.textContent); // available here
  }
  
  ngAfterContentChecked() {
    // called every time the projected content has been checked
  }
  
  ngAfterViewInit() {
    // called after component's view & child views have been initialized
    // when the DOM is visible
  }
  
  ngAfterViewChecked() {
    // called every time the view & child views have been checked
  }
  
  ngOnDestroy() {
    // called once the component is about to be destroyed
  }

}
