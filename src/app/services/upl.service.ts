import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UplService {
  constructor(private http: HttpClient) { }
  get_by_id(upl_id: string): Observable<Upl> {
    return this.http.get<Upl>("/upl/" + upl_id);
  }
  get_by_id_archive(upl_id: string): Observable<Upl> {
    return this.http.get<Upl>("/upl/archive/" + upl_id);
  }
  get_by_sku_and_stock(sku: number, stock_id: number): Observable<string[]> {
    return this.http.post<string[]>("/upl/get_by_sku_stock/", { sku: sku, stock_id: stock_id });
  }
  split(upl_id: string, new_upl_id: string, piece: number): Observable<Upl> {
    return this.http.post<Upl>("/upl/split", { upl_id: upl_id, new_upl: new_upl_id, piece: piece });
  }
  divide(upl_id: string, new_upl_id: string, requested_amount: number): Observable<Upl> {
    return this.http.post<Upl>("/upl/divide", { upl_id: upl_id, new_upl: new_upl_id, requested_amount: requested_amount });
  }
  open(upl_id: string): Observable<Upl> {
    return this.http.put<Upl>("/upl/open", { upl_id: upl_id });
  }
  close(upl_id: string): Observable<Upl> {
    return this.http.put<Upl>("/upl/close", { upl_id: upl_id });
  }
  merge_back(upl_id: string): Observable<Upl> {
    return this.http.put<Upl>("/upl/merge_back", { upl_id: upl_id });
  }
  get_location_info(sku: number): Observable<LocationInfo> {
    return this.http.post<LocationInfo>("/upl/get_location_info", { sku: sku });
  }
  get_location_info_bulk(skus: number[]): Observable<LocationInfo[]> {
    return this.http.post<LocationInfo[]>("/upl/get_location_info_bulk", skus);
  }
}

export enum UplKind {
  Sku = 'Sku',
  BulkSku = 'BulkSku',
  OpenedSku = 'OpenedSku',
  DerivedProduct = 'DerivedProduct'
}

export enum UplLocation {
  Stock = 'Stock',
  Delivery = 'Delivery',
  Cart = 'Cart',
  Discard = 'Discard'
}

export enum UplLock {
  Cart = 'Cart',
  Delivery = 'Delivery',
  Inventory = 'Inventory'
}

export class Upl {
  public upl_id: string;
  public product_id: number;
  public upl_kind: UplKind;
  public sku: number;
  public pieces: number;
  public divisible_amount: number;
  public sku_divisible_amount: number;
  public derived_successors: number[];
  public derived_from: number;
  public is_healthy: boolean;
  public best_before: string;
  public is_depreciated: boolean;
  public depreciation_id: number;
  public depreciation_comment: string;
  public has_special_price: boolean;
  public procurement_id: number;
  public procurement_net_price: number;
  public procurement_net_price_sku: number;
  public is_divisible: boolean;
  public lock: UplLock;
  public lock_id: string;
  public location: UplLocation;
  public location_id: string;
  public product_unit: string;
  public vat: string;
  public price_net: number;
  public price_gross: number;
  public margin_net: number;
  public is_archived: boolean;
  public created_by: number;
  public created_at: string;
}

export class StockInfo {
  total: number;
  healthy: number;
}

export class LocationInfo {
  // SKU ID
  sku: number;
  // Map<stock_id, stock_info>
  stocks: Map<number, StockInfo>;
}