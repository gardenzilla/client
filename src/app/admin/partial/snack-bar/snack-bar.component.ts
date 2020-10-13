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
  animations: [
    trigger('animate', [
      state('out', style({
        top: '-50px',
        transform: 'translateY(-100%)',
      })),
      state('in', style({
      })),
      transition('in => out', [
        animate('1s')
      ]),
      transition('out => in', [
        animate('0.3s')
      ]),
    ]),
  ],
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  constructor(private snackService: SnackBarService) { }

  text: string = 'Sikeresen mentve';
  state: string = 'out';
  subscription$: Subscription;

  ngOnInit() {
    this.subscription$ = this.snackService.snackMessage$.subscribe(msg => this.displayMessage(msg));
  }

  display() {
    this.state = 'in';
    setTimeout(() => {
      this.state = 'out';
    }, 1500);
  }

  displayMessage(msg: string) {
    this.text = msg;
    this.display();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

}
