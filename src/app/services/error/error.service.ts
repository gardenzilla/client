import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpError } from 'src/app/interface/error';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  errors$: Subject<HttpError> = new Subject();

  constructor() { }

  open(error: HttpError) {
    this.errors$.next(error);
  }
}
