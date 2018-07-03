import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      // first arg matches property value in component class
      state('normal', style({
        // single-quote to use hyphen, otherwise camelCase; MUST BE CONSISTENT or you'll get bugs
        backgroundColor: 'red',
        transform: 'translateX(0)' // default position
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px)'
      })),
      // transition('normal => highlighted', animate(500)),
      // transition('highlighted => normal', animate(1000)),
      transition('highlighted <=> normal', animate(500)), // same function w/timing
    ]),

    trigger('wildState', [
      // first arg matches property value in component class
      state('normal', style({
        // single-quote to use hyphen, otherwise camelCase; MUST BE CONSISTENT or you'll get bugs
        backgroundColor: 'red',
        transform: 'translateX(0) scale(1)', // default position
        borderRadius: '0'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px) scale(1)',
        borderRadius: '0'
      })),
      state('shrunken', style({
        backgroundColor: 'green',
        transform: 'translatex(0px) scale(0.5)'
      })),
      transition('highlighted => normal', animate(500)),
      transition('normal => highlighted', animate(1000)),
      // wildcard; to & from any state
      transition('shrunken <=> *', [
        style({ // instantly change this (starting phase)
          backgroundColor: 'orange',
        }),
        animate(1000, style({ // animate this over time
          borderRadius: '50px'
        })),
        animate(500)  // (transition to end state when no styles included) - instead of instant
      ])
    ]),

    trigger('list1', [
      state('in', style({ // this style is final style
        opacity: 1,
        transform: 'translateX(0)'
      })),
      // void means hasn't been added to DOM yet (use as end state for removing)
      // animate from non-existent to any state. Could also user :enter & :leave reserved words
      transition('void => *', [
        style({ // initial style
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300), // animate from initial to final over time
      ]),
      transition(':leave', [
        animate(300, style({
          transform: 'translateX(100px)',
          opacity: 0
        }))
      ])
    ]),

    // using keyframes
    trigger('list2', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        animate(1000, keyframes([ // array w/individual phases
          style({ // steps. By default they will take equally long
            transform: 'translateX(-100px)',
            opacity: 0,
            offset: 0 // which % of the time in animate should this be at?
          }),
          style({
            transform: 'translateX(-50px)',
            opacity: 0.5,
            offset: 0.3 // 30% of the time
          }),
          style({
            transform: 'translateX(-20px)',
            opacity: 1,
            offset: 0.8
          }),
          style({
            transform: 'translateX(0px)',
            opacity: 1,
            offset: 1
          })
        ]))
      ]),
      transition(':leave', [
        group([ // executes these synchronously
          animate(300, style({
            color: 'red'
          })),
          animate(800, style({
            transform: 'translateX(100px)',
            opacity: 0
          }))
        ])
      ])
    ]),
  ]
})
export class AppComponent {
  state = 'normal';
  wildState = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];

  onAdd(item) {
    this.list.push(item);
  }

  onDelete(idx: number) {
    this.list.splice(idx, 1);
  }

  onAnimate() {
    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
    this.wildState === 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
  }

  onShrink() {
    this.wildState = 'shrunken';
  }

  animationStarted(event) {
    console.log(event);
  }

  animationEnded(event) {
    console.log(event);
  }
}
