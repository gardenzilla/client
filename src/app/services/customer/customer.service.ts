import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  get_all(): Observable<Customer[]> {
    return this.http.get<Customer[]>("/customer/all");
  }
  get_by_id(id: string): Observable<Customer> {
    return this.http.get<Customer>("/customer/" + id);
  }
  update_by_id(id: string, customer: CustomerNew): Observable<Customer> {
    return this.http.put<Customer>(`/customer/${id}`, customer);
  }
  new(customer: CustomerNew): Observable<Customer> {
    return this.http.post<Customer>("/customer/new", customer);
  }
}

export class Customer {
  constructor(
    public id: string = '',
    public name: string = '',
    public email: string = '',
    public phone: string = '',
    public tax_number: string = '',
    public address: Address = new Address(),
    public date_created: string = '',
    public created_by: string = '',
    public has_user: boolean = false,
    public users: string[] = []
  ) {}
}

export class Address {
  constructor(
    public zip: string = '',
    public location: string = '',
    public address: string = ''
  ) {}
}

export class CustomerNew {
  constructor(
    public name: string = '',
    public email: string = '',
    public phone: string = '',
    public tax_number: string = '',
    public zip: string = '',
    public location: string = '',
    public address: string = ''
  ) {}
}