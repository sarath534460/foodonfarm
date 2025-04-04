import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, of, BehaviorSubject, EMPTY } from 'rxjs';
import { switchMap, catchError, filter, take, tap } from 'rxjs/operators';

@Injectable()
export class LogintimeInterceptor implements HttpInterceptor {
  // private tokenChecked$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    auth:any
    http:any
    y: any;
  
  constructor( auth: AuthService, http: HttpClient) {

    this.auth=auth
    this.http=http
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe( tap(
      (event: any) => {

        console.log(event)
        if (event instanceof HttpResponse) {
          // Log successful response
          if(event.body &&event.body.flag=="NOTOKEN"){
             this.auth.logout()
          }
          else if(event.body.flag=="TOKENERROR"){
            this.auth.logout()

          }

          else if(event.body.flag=="TOKENTIMELEFT"){
            this.auth.logout()

          }
          console.log('Response:',);
        }
      },
      (error) => {
        // Log error response
        console.error('Error Response:', error);
      }
    ))
  }
}
