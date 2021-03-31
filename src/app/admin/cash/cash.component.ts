import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CashService, NewTransaction, Transaction } from 'src/app/services/cash.service';
import { Profile } from 'src/app/services/profile/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss']
})
export class CashComponent implements OnInit {

  dtOptions: DataTables.Settings = {};

  transaction_kinds = [{ code: 'Cash', display: 'Készpénz' }, { code: 'Card', display: 'Bankkártya' }];

  balance: number = 0;
  today_transactions: Transaction[] = [];
  display_transactions: Transaction[] = [];
  users: Map<number, Profile> = new Map();
  model_new_transaction: NewTransaction = new NewTransaction(0, "", "");

  constructor(
    private cashService: CashService,
    private userService: UserService
  ) {
  }

  todayTurnoverCash(): number {
    let res: number = 0;
    this.today_transactions.forEach(
      tr => {
        if (tr.kind == 'Cash') { // TODO: use class method
          res = res + tr.amount;
        }
      }
    );
    return res;
  }

  todayTurnoverCard(): number {
    let res: number = 0;
    this.today_transactions.forEach(
      tr => {
        if (tr.kind == 'Card') { // TODO: use class method
          res = res + tr.amount;
        }
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
        this.cashService.get_bulk(res).subscribe(res => {
          this.display_transactions = res;
          this.dtTrigger.next();
        });
      }
    );
  }

  getUser(uid: number): Profile | null {
    return this.users[uid] ? this.users[uid] : null;
  }

  submitNewTransaction = (): Observable<any> => {
    return this.cashService.new(this.model_new_transaction).pipe(
      tap(
        res => {
          this.display_transactions.push(res);
          this.loadBalance();
          this.loadTodayTransactions();
        }
      )
    );
  }

  dtTrigger: Subject<any> = new Subject<any>();
  
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        lengthMenu: 'mutat _MENU_ elem',
        search: 'Keresés'
      }
    };

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