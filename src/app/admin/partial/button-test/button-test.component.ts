import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'button-test',
  templateUrl: './button-test.component.html',
  styleUrls: ['./button-test.component.css']
})
export class ButtonTestComponent implements OnInit {

  constructor() { }

  _action: Subject<number> = new Subject();

  ngOnInit(): void { }

  action() {
    this._action.next(0);
  }

  afterClicked(): Subject<number> {
    return this._action;
  }

}
