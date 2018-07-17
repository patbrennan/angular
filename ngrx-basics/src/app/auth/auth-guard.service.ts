import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { map, take } from 'rxjs/operators';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers'; // why? Can't we just use fromApp.AppState?

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromApp.AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // select method returns an observable
    return this.store.select('auth').pipe(
      take(1),
      map( (authState: fromAuth.State) => {
        return authState.authenticated;
      })
    );
  }
}
