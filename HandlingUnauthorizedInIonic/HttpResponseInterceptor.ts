import { Injectable } from "@angular/core";
import { Events } from "ionic-angular";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(
    public events: Events
  ){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.events.publish("unauthorized:requestError");
        } else if (err.status === 408) {
          this.events.publish("timeout:requestError");
        }
      } else if (err.name === "TimeoutError") {
        this.events.publish("timeout:requestError");
      }
    });

  }
}