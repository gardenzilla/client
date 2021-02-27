import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UplInfoObj } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  constructor(private http: HttpClient) { }
  get_by_id(purchase_id: string): Observable<IPurchaseObj> {
    return this.http.get<IPurchaseObj>(`/purchase/${purchase_id}`);
  }
  get_info_by_id(purchase_id: string): Observable<PurchaseInfoObj> {
    return this.http.post<PurchaseInfoObj>(`/purchase/info/`, { purchase_id: purchase_id });
  }
  download_receipt(purchase_id: string): Observable<PdfObj> {
    return this.http.post<PdfObj>(`/purchase/receipt/`, { purchase_id: purchase_id });
  }
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
    public invoice_id: string,
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

export interface Item {
  kind: string,
  product_id: number,
  name: string,
  piece: number,
  retail_price_net: number,
  vat: string,
  retail_price_gross: number,
  total_retail_price_net: number,
  total_retail_price_gross: number,
  upl_ids: string[]
}

export interface IPayment {
  id: string,
  amount: number,
}

export interface ILoyaltyTransaction {
  loyalty_account_id: string,
  transaction_id: string,
  burned_points: number
}

export interface IPurchaseObj {
  purchase_id: string,
  customer: CustomerObj | null,
  commitment_id: string,
  commitment_discount_percentage: number,
  commitment_discount_amount_gross: number,
  loyalty_account_id: string,
  loyalty_card_id: string,
  loyalty_level: string,
  burned_loyalty_points: number,
  upl_info_objects: UplInfoObj[],
  need_invoice: boolean,
  invoice_id: string,
  total_net_price: number,
  total_vat: number,
  total_gross_price: number,
  payment_kind: string,
  payments: IPayment,
  items: Item[],
  burned_points: ILoyaltyTransaction,
  payable: number,
  payment_balance: number,
  date_completion: string,
  payment_duedate: string,
  profit_net: number,
  restored: boolean,
  owner_uid: number,
  created_by: number,
  created_at: string,
}

export interface PdfObj {
  pdf_base64: string,
}