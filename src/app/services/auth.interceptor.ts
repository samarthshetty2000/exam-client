import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService:UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    const token=this.userService.getToken()
    console.log(token)

    if(token!=null ){
   request = request.clone({   setHeaders: {
   
      Authorization: `Bearer ${token}`
    }});
  }

    return next.handle(request);
  }
}
