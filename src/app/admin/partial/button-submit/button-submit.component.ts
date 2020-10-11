import { Component, Input, OnInit, OnChanges } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'button-submit',
  animations: [
    trigger('tryLoad', [
      state('done', style({
        transform: 'rotate(0)'
      })),
      state('loading', style({
        transform: 'rotate(0)',
        backgroundColor: 'purple',
      })),
      transition('done => loading', [
        animate('1s')
      ]),
      transition('loading => done', [
        animate('2s')
      ]),
    ]),
  ],
  templateUrl: './button-submit.component.html',
  styleUrls: ['./button-submit.component.css']
})
export class ButtonSubmitComponent implements OnChanges {
  /* is loading indicator variable
    set true when loading, and false when its done
    we can set it manually from a parent component using
    load() and done() methods */
  isLoading: boolean = false;

  @Input()
  get name(): string { return this._name; }
  set name(name: string) {
    this._name = (name && name.trim()) || this._default_name;
  }

  @Input()
  callback: () => void;

  private _default_name: string = 'Mentés';
  private _name: string = 'Mentés';

  load() {
    this.isLoading = true;
  }

  ngOnChanges() { }
}
