import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-snack-bar',
  // animations: [
  //   trigger('animate', [
  //     state('out', style({
  //       top: '-50px',
  //       transform: 'translateY(-100%)',
  //     })),
  //     state('in', style({
  //     })),
  //     transition('in => out', [
  //       animate('0.2s')
  //     ]),
  //     transition('out => in', [
  //       animate('0.2s')
  //     ]),
  //   ]),
  // ],
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  constructor(private snackService: SnackBarService) { }

  text: string;
  // state: string = 'out';
  subscription: Subscription;
  displaySubscription: number;

  ngOnInit() {
    this.subscription = this.snackService.snackMessage$.subscribe(msg => this.displayMessage(msg));

  }

  displayMessage(msg: string) {
    if (this.displaySubscription) {
      clearTimeout(this.displaySubscription);
    }
    this.text = msg;
    this.displaySubscription = setTimeout(() => {
      this.text = null;
    }, 400);
  }

  ngOnDestroy() {
    if ( this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.displaySubscription) {
      clearTimeout(this.displaySubscription);
    }
  }

}
