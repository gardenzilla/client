import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  constructor(private http: HttpClient) { }
  new(price: Price): Observable<Price> {
    return this.http.post<Price>("/price/new", price);
  }
  get_by_id(sku: number): Observable<Price> {
    return this.http.get<Price>("/price/" + sku);
  }
  get_bulk(sku_ids: number[]): Observable<Price[]> {
    return this.http.post<Price[]>(`/price/bulk`, sku_ids);
  }
  get_price_history(sku: number): Observable<PriceHistory[]> {
    return this.http.get<PriceHistory[]>(`/price/history/${sku}`);
  }
  get_price_changes(date_from: string, date_till: string): Observable<number[]> {
    return this.http.post<number[]>('/price/changes', { from: date_from, till: date_till });
  }
}

export class Price {
  constructor(
    public sku: number = 0,
    public price_net_retail: number = 0,
    public vat: string = "27",
    public price_gross_retail: number = 0
  ) { }
}

export class PriceHistory {
  constructor(
    public sku: number = 0,
    public price_net_retail: number = 0,
    public vat: string = "",
    public price_gross_retail: number = 0,
    public created_at: string = "",
    public created_by: number = 0,
  ) { }
}