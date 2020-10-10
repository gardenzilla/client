import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/interface/customer';

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
}
