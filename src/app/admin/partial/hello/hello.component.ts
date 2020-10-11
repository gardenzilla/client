import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {

  constructor() { }

  counter: number = 0;

  ngOnInit(): void {
  }

}
