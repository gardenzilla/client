import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  snackMessage$: Subject<string> = new Subject();

  constructor() { }

  displaySnack(text: string) {
    this.snackMessage$.next(text);
  }
  message(text: string) {
    this.displaySnack(text);
  }
}
