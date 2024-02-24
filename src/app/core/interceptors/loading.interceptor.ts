import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable, finalize } from "rxjs";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private _NgxSpinnerService:NgxSpinnerService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this._NgxSpinnerService.show();

    return next.handle(request).pipe(finalize(() => {
      this._NgxSpinnerService.hide();
    }));
  }
}
