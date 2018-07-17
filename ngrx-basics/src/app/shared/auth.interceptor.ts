import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted!', req);

    return this.store.select('auth').pipe( // this is observable
      take(1), // prevent interceptor from setting auth token every time to prevent errors
      switchMap(
        (authState: fromAuth.State) => { // swithMap will use return value; which is an observable
          const copiedReq = req.clone({params: req.params.set('auth', authState.token)});
          return next.handle(copiedReq);
        }
      )
    );
  }
}

// in code above, store.select() sets up an on-going subscription to our store. Whenever we change
// the state, it will fire. It will then extract the token & send the request. This includes on
// logging out, which will throw an error. We really only want to do this one time with take(1)
// which completes, or unsubscribes from the observable, after getting 1 value.
