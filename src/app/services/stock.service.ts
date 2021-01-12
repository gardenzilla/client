import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  constructor(private http: HttpClient) { }
  new(customer: NewStock): Observable<Stock> {
    return this.http.post<Stock>("/stock/new", customer);
  }
  get_by_id(id: number): Observable<Stock> {
    return this.http.get<Stock>("/stock/" + id);
  }
  get_all(): Observable<Stock[]> {
    return this.http.get<Stock[]>("/stock/all");
  }
  update_by_id(stock: Stock): Observable<Stock> {
    return this.http.put<Stock>(`/stock/${stock.stock_id}`, stock);
  }
}

export class Stock {
  constructor(
    public stock_id: number = 0,
    public name: string = "",
    public description: string = "",
    public created_at: string = "",
    public created_by: number = 0
  ) { }
}

export class NewStock {
  constructor(
    public name: string = "",
    public description: string = "",
  ) { }
}