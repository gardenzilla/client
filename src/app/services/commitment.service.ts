import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommitmentService {
  constructor(private http: HttpClient) { }
  add_commitment(customer_id: number,
    target: number,
    discount_percentage: number): Observable<CustomerInfo> {
    return this.http.post<CustomerInfo>("/commitment/new", { customer_id: customer_id, target: target, discount_percentage: discount_percentage });
  }
  get_by_id(customer_id: number): Observable<CustomerInfo> {
    return this.http.get<CustomerInfo>("/commitment/" + customer_id);
  }
  get_all(): Observable<number[]> {
    return this.http.get<number[]>(`/commitment/all`);
  }
}

export interface CommitmentObj {
  commitment_id: string,
  customer_id: number,
  target: number,
  discount_percentage: number,
  valid_still: string,
  balance: number,
  purchase_log: PurchaseInfo[],
  is_withdrawn: boolean,
  is_active: boolean,
  created_by: number,
  created_at: string
}

export interface PurchaseInfo {
  purchase_id: string,
  total_net: number,
  total_gross: number,
  applied_discount: number,
  removed: boolean,
  created_at: string,
}

export interface CustomerInfo {
  customer_id: number,
  commitments: CommitmentObj,
}

export interface CustomerCommitmentInfo {
  active_commitment: CommitmentInfo | null,
  has_active_commitment: boolean,
}

export interface CommitmentInfo {
  commitment_id: string,
  customer_id: number,
  target: number,
  discount_percentage: number,
  balance: number,
  is_active: boolean,
}