import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { Observable, Subscription } from 'rxjs';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';

@Component({
  selector: 'button-submit',
  animations: [
    trigger('animateBtn', [
      state('idle', style({})),
      state('loading', style({
        backgroundColor: 'purple',
      })),
      state('done', style({
        backgroundColor: 'green'
      })),
      state('error', style({
        backgroundColor: 'red',
      })),
      transition('idle => loading', [
        animate('1s')
      ]),
      transition('loading => done', [
        animate('0.3s')
      ]),
      transition('loading => error', [
        animate('1s')
      ]),
      transition('done => idle', [
        animate('0.3s')
      ]),
      transition('error => idle', [
        animate('0.3s')
      ])
    ]),
  ],
  templateUrl: './button-submit.component.html',
  styleUrls: ['./button-submit.component.css']
})

/**
 Maybe update with this?
 https://codepen.io/joshuaward/pen/oGZrWN
 */
export class ButtonSubmitComponent implements OnInit {
  @Input() callback: () => Observable<any>;
  @Input() name: string = "Mentés";
  @Input() snackBarMessage?: string;

  subscription: Subscription;
  state: string = "idle";

  constructor(private snackService: SnackBarService) { }

  load() {
    this.state = 'loading';
    this.subscription = this.callback().subscribe(
      () => { },
      () => { this.state = 'error' },
      () => { this.state = 'done'; if (this.snackBarMessage) { this.snackService.displaySnack(this.snackBarMessage) } });
    setTimeout(() => {
      this.state = 'idle';
    }, 1200);
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
