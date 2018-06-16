import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Observer, Subscription, interval } from "rxjs";
// import "rxjs/Rx"; <= pre-6.0 import for operators
import { map } from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  // store subscriptions here so they can be destroyed, preventing memory leaks
  numbersSubscription: Subscription;
  customObsSubscription: Subscription;
  
  constructor() { }

  ngOnInit() {
    // our own custom observable: emit numbers at a fixed interval
    const myNumbers = interval(1000)
    // > 6.0 rxjs means you have to pass operators into pipe
      .pipe(map( // maps data you get into new Obs w/any transformation of choice
        (data: number) => {
          return data * 2;
        }
      ));
    
    this.numbersSubscription = myNumbers.subscribe(
      (number: number) => {
        console.log(number);
      }
    );
    
    // fire after 2 & 4 seconds, then fail after 5 seconds.
    const myCustomObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {  // tell it when to fire
        observer.next("first package"); // next emits next data package
      }, 2000);
      setTimeout(() => {
        observer.next("second package");
      }, 4000);
      setTimeout(() => {
        // observer.error("ERROR WILL ROBINSON");
        observer.complete();
      }, 5000);
      setTimeout(() => {
        observer.next("third package"); // won't ever emit; observable complete
      }, 6000);
    });
    
    // subscribe - become the observer
    this.customObsSubscription = myCustomObservable.subscribe(
      (data: string) => { console.log(data); },   // success
      (error: string) => { console.log(error); }, // error
      () => { console.log("completed"); }         // complete
    );
  }
  
  ngOnDestroy() {
    // clean up subscriptions so you don't have memory leaks:
    this.numbersSubscription.unsubscribe();
    this.customObsSubscription.unsubscribe();
  }

}
