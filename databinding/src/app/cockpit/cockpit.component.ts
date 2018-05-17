// must include EventEmitter & Output to create custom events that will trigger
import { Component, 
         OnInit,
         EventEmitter,
         Output,
         ViewChild, 
         ElementRef,
         OnChanges,
         DoCheck,
         AfterContentInit,
         AfterContentChecked,
         AfterViewInit,
         AfterViewChecked,
         OnDestroy,
         SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements 
  OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked, OnDestroy {
  // These are custom event definitions that create eventemitter objects
  // must be invoked
  // @Output() registers these events with the parent object so it can listen
  // The <> tell the EventEmitter object the structure of the data it will receive
  // when the event is triggered.
  @Output() serverCreated = new EventEmitter<{name: string, content: string}>();
  @Output() blueprintCreated = new EventEmitter<{name: string, content: string}>();
  
  // newServerName = '';
  // newServerContent = '';
  
  // Decorator that allows access to template/DOM w/selectors, of type ElementRef
  @ViewChild("contentInput") contentInput: ElementRef;

  constructor() { }
  
  ngOnInit() {
    
  }
  
  onAddServer(nameInput: HTMLInputElement) {
    // calls the native "emit" method for EventEmitter & passes the current obj
    this.serverCreated.emit({
      name: nameInput.value,
      // using the @ViewChild decorator - must access element w/nativeElement
      content: this.contentInput.nativeElement.value;
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      name: nameInput.value,
      content: this.contentInput.nativeElement.value
    });
  }
  
}
