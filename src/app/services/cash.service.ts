import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CashService {
  constructor(private http: HttpClient) { }
  new(transaction: NewTransaction): Observable<Transaction> {
    return this.http.post<Transaction>("/cash/new_general", transaction);
  }
  get_by_id(tid: string): Observable<Transaction> {
    return this.http.get<Transaction>("/cash/" + tid);
  }
  get_bulk(transaction_ids: string[]): Observable<Transaction[]> {
    return this.http.post<Transaction[]>(`/cash/bulk`, transaction_ids);
  }
  get_balance(): Observable<number> {
    return this.http.get<number>("/cash/balance");
  }
  get_by_date_range(from: string, till: string): Observable<string[]> {
    return this.http.post<string[]>("/cash/date_range", { date_from: from, date_till: till });
  }
}

export class Transaction {
  constructor(
    public transaction_id: string,
    public cart_id: number | null,
    public amount: number,
    public reference: string,
    public comment: string,
    public created_by: number,
    public created_at: string
  ) { }
}

export class NewTransaction {
  constructor(
    public amount: number = 0,
    public reference: string = "",
    public comment: string = ""
  ) { }
}