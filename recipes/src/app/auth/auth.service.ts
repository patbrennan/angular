// using Firebase SDK - configured in app component when the app starts
import * as firebase from 'firebase';

import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router) {
  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(
      error => console.log(error)
    );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(
      response => {
        this.router.navigate(['/']);
        firebase.auth().currentUser.getIdToken() // promise
        .then( // wait for token
          (newToken: string) => this.token = newToken // reassign it
        )
      }
    )
    .catch(
      error => console.log(error)
    );
  }

  logout() {
    firebase.auth().signOut();
    this.token = null; // reset
  }

  // get access to the auth token stored in browser's local storage
  getIdToken() {
    // this is async action - look @ local storage; if still valid, OK; if not,
    // reaches out to backend automatically & gets new valid token
    firebase.auth().currentUser.getIdToken() // Therefore, this only returns a Promise
    .then(
      (newToken: string) => this.token = newToken
    );

    return this.token; // there is the danger here of returning an expired token
  }

  isAuthenticated() {
    return this.token != null;
  }
}