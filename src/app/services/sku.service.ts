import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkuService {
  constructor(private http: HttpClient) { }
  new(sku: SkuNew): Observable<Sku> {
    return this.http.post<Sku>("/sku/new", sku);
  }
  get_by_id(sku: number): Observable<Sku> {
    return this.http.get<Sku>("/sku/" + sku);
  }
  get_all(): Observable<number[]> {
    return this.http.get<number[]>("/sku/all");
  }
  get_bulk(sku_ids: number[]): Observable<Sku[]> {
    return this.http.post<Sku[]>(`/sku/bulk`, sku_ids);
  }
  update(sku: number, sku_obj: Sku): Observable<Sku> {
    return this.http.put<Sku>(`/sku/${sku}`, sku_obj);
  }
  find(query: string): Observable<number[]> {
    return this.http.post<number[]>('/sku/find', { query: query });
  }
  set_divide(sku: number, can_divide: boolean): Observable<Sku> {
    return this.http.post<Sku>('/sku/set_divide', { sku: sku, can_divide: can_divide });
  }
  set_discontinued(sku: number, discontinued: boolean): Observable<Sku> {
    return this.http.put<Sku>("/sku/set_discontinued", { sku: sku, discontinued: discontinued });
  }
}

export class SkuNew {
  constructor(
    public product_id: number = 0,
    public sub_name: string = "",
    public quantity: string = ""
  ) { }
}

export class Sku {
  constructor(
    public sku: number = 0,
    public product_id: number = 0,
    public subname: string = "",
    public display_name: string = "",
    public display_packaging: string = "",
    public quantity: string = "",
    public unit: string = "",
    public can_divide: boolean = false,
    public discontinued: boolean = false,
    public perishable: boolean = false,
    public created_at: string = "",
    public created_by: number = 0,
  ) { }
}
