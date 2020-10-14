import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {

  constructor() { }

  data: Customer[] = [
    new Customer('Peti', 31),
    new Customer('Kriszti', 28),
    new Customer('Peti', 1.9),
    new Customer('Andris', 0.4)
  ]

  ngOnInit(): void {
  }
}

export class Customer {
  constructor(
    public name: string,
    public age: number
  ){}
}
