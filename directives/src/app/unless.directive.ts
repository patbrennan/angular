// Building a Custom Structural Directive

import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  // this set syntax turns this into setter that is executed whenever the property
  // changes. There is still the `unless` property. It changes whenever it changes
  // outside - whenever the condition we pass changes or some parameter of this
  // condition - remember, we're creating an "unless" directive.
  // NOTE: The selector & property name MUST be identical to use in html
  @Input() set appUnless(condition: boolean) {
    if (!condition) { // when we want to display something (opposite ngIf)
      // display something
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      // display nothing
      this.vcRef.clear(); // remove everything from this place in the DOM.
    }
  }
  
  // remember that Ng just creates <ng-template> behind the scenes to accomplish
  // need to get access to the template, and the place in the DOM where it should
  // be rendered. Both can be injected upon instantiation
  // template = what, viewContainer (vcRef) = where
  // remember that these are creating properties on this directive we can access
  constructor(private templateRef: TemplateRef<any>,
              private vcRef: ViewContainerRef) {
  }

}
