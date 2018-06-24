// Add this import to get your env variables
// Angular will pull in the correct script @ build time
import { environment } from '../environments/environment';

import { Component, OnInit } from '@angular/core';

import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  activeNav: string = 'recipes';
  
  onNavClicked(clicked: string) {
    this.activeNav = clicked;
  }
  
  ngOnInit() {
    firebase.initializeApp({ // method given w/Firebase - see docs
      apiKey: environment.firebaseApiKey,
      authDomain: environment.firebaseAuthDomain,  
    });
  }
  
}
