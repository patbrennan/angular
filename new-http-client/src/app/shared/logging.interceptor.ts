import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      // tap allows us to execute code on data that goes through obs w/out consuming it
      tap(
        event => {
          console.log('Logging Interceptor', event);
        }
      )
    )
  }
}