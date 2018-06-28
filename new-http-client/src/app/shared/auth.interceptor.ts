import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercepted!', req);

    // necessary. If we were to retry, each time this would be called. Requests are immutable
    // for this reason, so the retries wouldn't break. We clone it here so we can modify it.
    const copiedReq = req.clone({
      params: req.params.append('auth', this.authService.getToken())
    });

    return next.handle(copiedReq); // let request continue its journey
  }
}
