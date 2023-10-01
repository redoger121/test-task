import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class authInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticate) {
      const token = this.authService.getUserToken();
      const modifiedReq = req.clone({
        params: new HttpParams().set('auth', token!),
      
      });
   
      return next.handle(modifiedReq);
    }
    return next.handle(req);
  }
}
