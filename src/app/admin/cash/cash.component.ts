import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CashService, Transaction } from 'src/app/services/cash.service';
import { Profile } from 'src/app/services/profile/profile.service';
import { UserService } from 'src/app/services/user.service';

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

  balance: number = 0;
  today_transactions: Transaction[] = [];
  display_transactions: Transaction[] = [];
  users: Map<number, Profile> = new Map();

  constructor(
    private cashService: CashService,
    private userService: UserService
  ) {
  }

  todayPayIn(): number {
    let res: number = 0;
    this.today_transactions.forEach(
      tr => {
        res = res + tr.amount;
      }
    );
    return res;
  }

  loadBalance() {
    // Load balance
    this.cashService.get_balance().subscribe(res => this.balance = res);
  }

  loadTodayTransactions() {
    // Load today transactions
    let today = new Date().toISOString().slice(0, 10);
    let _tomorrow = new Date();
    _tomorrow.setDate(_tomorrow.getDate() + 1);
    let tomorrow = _tomorrow.toISOString().slice(0, 10);
    this.cashService.get_by_date_range(new Date(today).toISOString(), new Date(tomorrow).toISOString()).subscribe(
      res => {
        this.cashService.get_bulk(res).subscribe(res => this.today_transactions = res);
      }
    );
  }

  loadDisplayTransactions() {
    // Load today transactions
    let from = new Date('2021-01-01').toISOString().slice(0, 10);
    let _tomorrow = new Date();
    _tomorrow.setDate(_tomorrow.getDate() + 1);
    let tomorrow = _tomorrow.toISOString().slice(0, 10);
    this.cashService.get_by_date_range(new Date(from).toISOString(), new Date(tomorrow).toISOString()).subscribe(
      res => {
        this.cashService.get_bulk(res).subscribe(res => this.display_transactions = res);
      }
    );
  }

  getUser(uid: number): Profile | null {
    return this.users[uid] ? this.users[uid] : null;
  }

  ngOnInit(): void {
    this.loadBalance();
    this.loadTodayTransactions();
    this.loadDisplayTransactions();
    this.userService.get_all().subscribe(
      res => {
        res.forEach(u => {
          this.users[u.uid] = u;
        });
      }
    );
  }

}

export class CashLogItem {
  constructor(
    public id: string,
    public date: string,
    public amount: number,
    public kind: string,
    public reference: string,
  ) { }
}