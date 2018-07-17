import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import * as authActions from './auth.actions';
import { map, switchMap, mergeMap } from 'rxjs/operators';
// fromPromise used to turn firebase promise returned, into an observable
import { fromPromise } from 'rxjs/internal-compatibility';
// ../../../../node_modules/

@Injectable()
export class AuthEffects {
  // ngrx effects automatically retrieves registered actions for use here
  constructor(private actions$: Actions,
              private router: Router) {
  }

  // @Effect({dispatch: false}) <= if you have side effect that doesn't lead to state change in end

  @Effect() // use this decorator to register an effect; listens for the appropriate actions
  authSignup = this.actions$.ofType(authActions.TRY_SIGNUP).pipe(
    map(
      (action: authActions.TrySignup) => {
        return action.payload; // we just want to work w/the payload
      }
    ), // returns observable, so we can chain more operators
    switchMap(
      (authData: {username: string, password: string}) => { // need to return observable in the end
        return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
      }
    ),
    switchMap(
      () => {
         // promise turned into observable
        return fromPromise(firebase.auth().currentUser.getIdToken());
      }
    ),
    mergeMap( // allows multiple observables to be merged into one
      (token: string) => {
        // handled by ngrx/effects package; can return multiple objects merged into one obseervable
        this.router.navigate(['/']);
        return [
          {
            type: authActions.SIGNUP // type; payload are reserved properties
          },
          {
            type: authActions.SET_TOKEN,
            payload: token
          }
        ];
      }
    )
  );

  @Effect()
  authSignIn = this.actions$.ofType(authActions.TRY_SIGNIN).pipe(
    map( (action: authActions.TrySignin) => {
      return action.payload;
    }),
    switchMap( (authData: {userName: string, password: string}) => {
      return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.userName, authData.password));
    }),
    switchMap( () => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    }),
    mergeMap( (token: string) => {
      this.router.navigate(['/']);
      return [
        {
          type: authActions.SIGNIN
        },
        {
          type: authActions.SET_TOKEN,
          payload: token
        }
      ];
    })
  );

  @Effect({dispatch: false})
  authLogout = this.actions$.ofType(authActions.LOGOUT).do( () => {
    this.router.navigate(['/']);
  });
}
