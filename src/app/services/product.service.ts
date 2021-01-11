import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }
  new(product: ProductNew): Observable<Product> {
    return this.http.post<Product>("/product/new", product);
  }
  get_by_id(sku: number): Observable<Product> {
    return this.http.get<Product>("/product/" + sku);
  }
  get_all(): Observable<number[]> {
    return this.http.get<number[]>("/product/all");
  }
  get_bulk(product_ids: number[]): Observable<Product[]> {
    return this.http.post<Product[]>(`/product/bulk`, product_ids);
  }
  update(sku: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`/product/${sku}`, product);
  }
  find(query: string): Observable<number[]> {
    return this.http.post<number[]>('/product/find', { query: query });
  }
}

export class Product {
  constructor(
    public product_id: number = 0,
    public name: string = "",
    public description: string = "",
    public unit: string = "",
    public skus: number[] = [],
    public created_at: string = "",
    public created_by: number = 0,
  ) { }
}

export class ProductNew {
  constructor(
    public name: string = "",
    public description: string = "",
    public unit: string = ""
  ) { }
}
