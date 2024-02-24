import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class MyhttpInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(localStorage.getItem('etoken') !== null){

      const myToken:any = {
        token: localStorage.getItem('etoken')
      }

      request = request.clone({
        setHeaders:myToken
      })
    }

    return next.handle(request);
  }
}
