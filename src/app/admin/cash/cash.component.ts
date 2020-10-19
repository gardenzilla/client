import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss']
})
export class CashComponent implements OnInit {

  log: CashLogItem[] = [
    new CashLogItem('asd2', '2020-10-19 20:12:41', 1000, 'purchase', '23dr'),
    new CashLogItem('asd2', '2020-10-18 20:33:41', 1000, 'purchase', '23dr'),
    new CashLogItem('ass9', '2020-10-16 07:43:41', 400, 'purchase', '22dr'),
    new CashLogItem('add1', '2020-10-11 20:12:41', 15600, 'purchase', '23dr'),
    new CashLogItem('fsd7', '2020-10-11 20:12:41', 43090, 'purchase', '23dr'),
    new CashLogItem('asr4', '2020-10-11 20:12:41', 1350, 'purchase', '23dr'),
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}

export class CashLogItem {
  constructor(
    public id: string,
    public date: string,
    public amount: number,
    public kind: string,
    public reference: string,
  ) {}
}