import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  get_all(): Observable<number[]> {
    return this.http.get<number[]>("/customer/all");
  }
  get_by_id(id: number): Observable<Customer> {
    return this.http.get<Customer>("/customer/" + id);
  }
  get_bulk(ids: number[]): Observable<Customer[]> {
    return this.http.post<Customer[]>("/customer/bulk", ids);
  }
  update_by_id(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`/customer/update`, customer);
  }
  new(customer: CustomerNew): Observable<Customer> {
    return this.http.post<Customer>("/customer/new", customer);
  }
  find(query: string): Observable<number[]> {
    return this.http.post<number[]>("/customer/find", { query: query });
  }
}

export class Customer {
  constructor(
    public id: number = 0,
    public name: string = '',
    public email: string = '',
    public phone: string = '',
    public tax_number: string = '',
    public address_zip: string = '',
    public address_location: string = '',
    public address_street: string = '',
    public date_created: string = '',
    public created_by: number = 0,
  ) { }
}

export class CustomerNew {
  constructor(
    public name: string = '',
    public email: string = '',
    public phone: string = '',
    public tax_number: string = '',
    public address_zip: string = '',
    public address_location: string = '',
    public address_street: string = '',
  ) { }
}