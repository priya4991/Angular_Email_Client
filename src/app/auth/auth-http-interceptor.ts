import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpEventType } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap, filter } from 'rxjs/operators';

@Injectable() //for Http interceptor we dont add any Injectable options
export class AuthHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //using clone as req object is read-only
        const modifiedReq = req.clone({
            withCredentials: true //httpClient by default DISCARDS the cookie
        });

        //the next.handle() observable returns us the http response
        return next.handle(modifiedReq)
            .pipe(
                filter(val => val.type === HttpEventType.Response),
                tap(val => console.log(val))
            );
    }
}
