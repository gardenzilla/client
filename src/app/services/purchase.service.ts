import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  constructor(private http: HttpClient) { }
  get_all(): Observable<string[]> {
    return this.http.get<string[]>("/purchase/all");
  }
  get_bulk_info(ids: string[]): Observable<PurchaseInfoObj[]> {
    return this.http.post<PurchaseInfoObj[]>("/purchase/bulk", ids);
  }
}

export class PurchaseInfoObj {
  constructor(
    public purchase_id: string,
    public customer: CustomerObj | null,
    public upl_count: number,
    public total_net_price: number,
    public total_vat: number,
    public total_gross_price: number,
    public balance: number,
    public payable: number,
    public document_invoice: boolean,
    public date_completion: String,
    public payment_duedate: String,
    public payment_expired: boolean,
    public profit_net: number,
    public restored: boolean,
    public created_by: number,
    public created_at: String,
  ) { }
}

export class CustomerObj {
  constructor(
    public id: number,
    public name: string,
    public zip: string,
    public location: string,
    public street: string
  ) { }
}
