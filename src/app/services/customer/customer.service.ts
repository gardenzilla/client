import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, CustomerNew } from 'src/app/interface/customer';

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
  // update_by_id(id: string, customer: Customer): Observable<Customer> {
  //   return this.http.post<Customer>("/")
  // }
}
