import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcurementService {
  constructor(private http: HttpClient) { }
  new(data: NewProcurement): Observable<Procurement> {
    return this.http.post<Procurement>("/procurement/new", data);
  }
  get_all(): Observable<number[]> {
    return this.http.get<number[]>("/procurement/all");
  }
  get_by_id(procurement_id: number): Observable<Procurement> {
    return this.http.get<Procurement>("/procurement/" + procurement_id);
  }
  get_bulk(ids: number[]): Observable<ProcurementInfo[]> {
    return this.http.post<ProcurementInfo[]>(`/procurement/bulk`, ids);
  }
  remove(procurement_id: number): Observable<any> {
    return this.http.delete<any>("/procurement/" + procurement_id);
  }
  set_delivery_date(procurement_id: number, delivery_date: Date): Observable<Procurement> {
    return this.http.put<Procurement>(`/procurement/set_delivery_date`, new SetDeliveryDate(procurement_id, delivery_date));
  }
  set_reference(procurement_id: number, reference: string): Observable<Procurement> {
    return this.http.put<Procurement>(`/procurement/set_reference`, new SetReference(procurement_id, reference));
  }
  add_sku(data: AddSku): Observable<Procurement> {
    return this.http.put<Procurement>(`/procurement/add_sku`, data);
  }
  remove_sku(data: RemoveSku): Observable<Procurement> {
    return this.http.put<Procurement>(`/procurement/remove_sku`, data);
  }
  set_sku_piece(data: SetSkuPiece): Observable<Procurement> {
    return this.http.put<Procurement>(`/procurement/set_sku_piece`, data);
  }
  set_sku_price(data: SetSkuPrice): Observable<Procurement> {
    return this.http.put<Procurement>(`/procurement/set_sku_price`, data);
  }
  add_upl(data: AddUpl): Observable<Procurement> {
    return this.http.put<Procurement>(`/procurement/add_upl`, data);
  }
  update_upl(data: UpdateUpl): Observable<Procurement> {
    return this.http.put<Procurement>(`/procurement/update_upl`, data);
  }
  remove_upl(data: RemoveUpl): Observable<Procurement> {
    return this.http.put<Procurement>(`/procurement/remove_upl`, data);
  }
}

export class NewProcurement {
  constructor(
    public source_id: number | null = null
  ) { }
}

export class Procurement {
  constructor(
    public id: number = 0,
    public source_id: number = 0,
    public reference: string = "",
    public estimated_delivery_date: string = "",
    public items: ProcurementItem[] = [],
    public upls: UplCandidate[] = [],
    public created_at: string = "",
    public created_by: number = 0
  ) { }
}

export class ProcurementItem {
  constructor(
    public sku: number = 0,
    public ordered_amount: number = 0,
    public expected_net_price: number = 0
  ) { }
}

export class UplCandidate {
  constructor(
    public upl_id: string = "",
    public sku: number = 0,
    public upl_piece: number = 0,
    public best_before: string = ""
  ) { }
}

export class ProcurementInfo {
  constructor(
    public id: number = 0,
    public source_id: number = 0,
    public sku_count: number = 0,
    public upl_count: number = 0,
    public estimated_delivery_date: string = "",
    public created_at: string = "",
    public created_by: number = 0
  ) { }
}

export class RemoveUpl {
  constructor(
    public procurement_id: number,
    public upl_id: string
  ) { }
}

export class UpdateUpl {
  constructor(
    public procurement_id: number,
    public upl_id: string,
    public sku: number,
    public piece: number,
    public best_before: string
  ) { }
}

export class AddUpl {
  constructor(
    public procurement_id: number,
    public upl_candidate: UplCandidate
  ) { }
}

export class SetSkuPiece {
  constructor(
    public procurement_id: number,
    public sku: number,
    public piece: number
  ) { }
}

export class SetSkuPrice {
  constructor(
    public procurement_id: number,
    public sku: number,
    public expected_net_price: number
  ) { }
}

export class RemoveSku {
  constructor(
    public procurement_id,
    public sku: number,
  ) { }
}

export class AddSku {
  constructor(
    public procurement_id: number,
    public sku: ProcurementItem,
  ) { }
}

export class SetReference {
  constructor(
    public procurement_id: number,
    public reference: string
  ) { }
}

export class SetDeliveryDate {
  constructor(
    public procurement_id: number,
    public delivery_date: Date
  ) { }
}

export class Remove {
  constructor(
    public procurement_id: number,
  ) { }
}