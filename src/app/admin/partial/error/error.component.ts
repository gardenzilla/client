import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { HttpError } from 'src/app/interface/error';
import { ErrorService } from 'src/app/services/error/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  errorSubscription: Subscription;
  isOpen: boolean = false;
  error: HttpError;

  constructor(private errorService: ErrorService) { }

  @HostListener('document:keydown.esc', ['$event'])
  close(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.isOpen = false;
    this.error = null;
  }

  ngOnInit(): void {
    this.errorSubscription
      = this.errorService.errors$.subscribe(err => {
        this.error = err;
        this.isOpen = true;
      });
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

}
