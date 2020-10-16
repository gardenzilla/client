import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductNew } from '../class/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  get_all(): Observable<Product[]> {
    return this.http.get<Product[]>("/product/all");
  }
  get_by_id(sku: string): Observable<Product> {
    return this.http.get<Product>("/product/" + sku);
  }
  update_by_id(sku: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`/product/${sku}`, product);
  }
  new(customer: ProductNew): Observable<Product> {
    return this.http.post<Product>("/product/new", customer);
  }
}