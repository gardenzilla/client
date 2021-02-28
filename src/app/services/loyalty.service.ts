import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyService {

  constructor(private http: HttpClient) { }

  new_account(customer_id: number,
    birthdate: string): Observable<Account> {
    return this.http.post<Account>("/loyalty/new", { customer_id: customer_id, birthdate: birthdate });
  }
  get_by_customer_id(customer_id: number): Observable<Account> {
    return this.http.get<Account>("/loyalty/customer/" + customer_id);
  }
  get_by_card_id(card_id: string): Observable<Account> {
    return this.http.get<Account>("/loyalty/card/" + card_id);
  }
  get_by_query(customer_id: number, birthdate: string): Observable<Account> {
    return this.http.post<Account>("/loyalty/query", { customer_id: customer_id, birthdate: birthdate });
  }
  get_transactions(account_id: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`/loyalty/transactions/${account_id}`);
  }
  set_card(account_id: string, card_id: string): Observable<Account> {
    return this.http.put<Account>("/loyalty/set_card/", { account_id: account_id, card_id: card_id });
  }
  set_loyalty_level(account_id: string, loyalty_level: string): Observable<Account> {
    return this.http.put<Account>("/loyalty/set_loyalty_level/", { account_id: account_id, loyalty_level: loyalty_level });
  }
  set_birthdate(account_id: string, birthdate: string): Observable<Account> {
    return this.http.put<Account>("/loyalty/set_birthdate/", { account_id: account_id, birthdate: birthdate });
  }
}

export enum TransactionKind {
  Burn = 'Burn',
  Earn = 'Earn'
}

export interface Transaction {
  transaction_id: string,
  account_id: string,
  purchase_id: string,
  transaction_kind: TransactionKind,
  amount: number,
  created_by: number,
  created_at: string,
}

export interface Account {
  account_id: string,
  customer_id: number,
  customer_birthdate: string,
  card_id: string,
  loyalty_level: string,
  balance_points: number,
  yearly_gross_turnover: number,
  created_at: string,
  created_by: number,
}
