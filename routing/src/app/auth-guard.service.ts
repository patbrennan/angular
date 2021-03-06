// Guard for doing some logic before/after some routes
import { CanActivate, 
         CanActivateChild,
         ActivatedRouteSnapshot,
         RouterStateSnapshot,
         Router
} from "@angular/router";

import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

import { AuthService } from "./auth.service";

@Injectable() // added so you can inject a service
export class AuthGuard implements CanActivate, CanActivateChild {
  
  constructor(private authService: AuthService,
              private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated()
      .then(
        (authenticated: boolean) => {
          if ( authenticated ) {
            return true;
          } else {
            this.router.navigate(['/']);
          }
        }
      );
  }
  
  // allows a different hook to be used in routes
  canActivateChild(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}