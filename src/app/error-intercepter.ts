import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorComponent } from './error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        let ErrorMessage = 'An unknown error occurred';
        if (err.error.message) {
          console.log(err);
          ErrorMessage = err.error.message;
        }
        this.dialog.open(ErrorComponent, { data: { message: ErrorMessage } });
        return throwError(err);
      })
    );
  }
}
