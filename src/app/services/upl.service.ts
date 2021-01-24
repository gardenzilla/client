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
}

export class Upl {
  constructor(
    public upl_id: string,
    public product_id: number,
    public upl_kind: UplKindSku | UplKindBulkSku | UplKindOpenedSku | UplKindDerivedProduct,
    public upl_piece: number,
    public is_healthy: boolean,
    public best_before: string,
    public depreciation: Depreciation | null,
    public procurement_id: number,
    public procurement_net_price: number,
    public is_divisible: boolean,
    public divisible_amount: number,
    public lock: {
      CartLock: number,
      DeliveryLock: number,
      InventoryLock: number
    } | string,
    public location: {
      Stock: number,
      Delivery: number,
      Cart: number,
      Discard: number
    },
    public is_archived: boolean,
    public created_by: number,
    public created_at: string
  ) { }
}

export class UplKindSku {
  Sku: {
    sku: number
  }
  constructor() { }
}

export class UplKindBulkSku {
  BulkSku: {
    sku: number,
    upl_pieces: number
  }
  constructor() { }
}

export class UplKindOpenedSku {
  OpenedSku: {
    sku: number,
    amount: number,
    successors: string[],
  }
  constructor() { }
}

export class UplKindDerivedProduct {
  DerivedProduct: {
    derived_from: string,
    amount: number
  }
  constructor() { }
}

export class Depreciation {
  constructor(
    public depreciation_id: number,
    public depreciation_comment: string,
    public depreciation_net_price: string
  ) { }
}