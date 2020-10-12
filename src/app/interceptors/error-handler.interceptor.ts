import { tap, map, catchError } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ErrorResponse } from '../class/error-response';
import { throwError } from 'rxjs';
import { HttpError } from '../class/http-error';
import { ErrorService } from '../services/error/error.service';
// import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

    constructor(private errorService: ErrorService) { }
    /**
     * TODO: Refact this whole error part
     */
    private transformError(error: HttpErrorResponse): HttpError {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            return new HttpError('danger', 'Oooo');
        } else {
            if (error.status == 0) {
                return new HttpError('danger', 'A Gardenzilla szerver nem elérhető! \
                    Vagy a szerver hibás, vagynincs internet kapcsolat');
            }
            // If there is 401 redirect to login
            if (error.status == 401) {
                // this.router.navigateByUrl('/login');
            }
            if (error.status == 400) {
                return new HttpError('warning', error.error.message, 400);
            } else {
                return new HttpError('danger', error.error.message, 400);
            }
        }
    };

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    this.errorService.open(this.transformError(error));
                    return throwError(error);
                })
            );
    }
}