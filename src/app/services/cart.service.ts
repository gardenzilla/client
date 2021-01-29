import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) { }
  new(): Observable<CartObj> {
    return this.http.post<CartObj>("/cart/new", { store_id: 1, created_by: 1 });
  }
  get_all(): Observable<string[]> {
    return this.http.get<string[]>("/cart/all");
  }
  get_bulk_info(ids: string[]): Observable<CartInfoObj[]> {
    return this.http.post<CartInfoObj[]>("/cart/bulk", ids);
  }
  get_by_id(id: string): Observable<CartObj> {
    return this.http.get<CartObj>(`/cart/${id}`);
  }
  add_customer(cart_id: string, customer_id: number): Observable<CartObj> {
    return this.http.put<CartObj>('/cart/add_customer', { cart_id: cart_id, customer_id: customer_id });
  }
  remove_customer(cart_id: string): Observable<CartObj> {
    return this.http.put<CartObj>('/cart/remove_customer', { cart_id: cart_id });
  }
  add_sku(cart_id: string, sku: number, piece: number): Observable<CartObj> {
    return this.http.put<CartObj>('/cart/add_sku', { cart_id: cart_id, sku_id: sku, piece: piece });
  }
  set_sku_piece(cart_id: string, sku: number, piece: number): Observable<CartObj> {
    return this.http.put<CartObj>('/cart/set_sku_piece', { cart_id: cart_id, sku: sku, piece: piece });
  }
  remove_sku(cart_id: string, sku: number): Observable<CartObj> {
    return this.http.put<CartObj>('/cart/remove_sku', { cart_id: cart_id, sku_id: sku });
  }
  add_upl(cart_id: string, upl_id: string): Observable<CartObj> {
    return this.http.put<CartObj>('/cart/add_upl', { cart_id: cart_id, upl_id: upl_id });
  }
  remove_upl(cart_id: string, upl_id: string): Observable<CartObj> {
    return this.http.put<CartObj>('/cart/remove_upl', { cart_id: cart_id, upl_id: upl_id });
  }
  add_payment(cart_id: string, kind: string, amount: number): Observable<CartObj> {
    return this.http.put<CartObj>('/cart/add_payment', { cart_id: cart_id, kind: kind, amount: amount });
  }
  close(cart_id: string): Observable<null> {
    return this.http.put<null>(`/cart/close`, { cart_id: cart_id });
  }
}

export class CartInfoObj {
  constructor(
    public id: string,
    public customer_name: String,
    public upl_count: number,
    public item_names: string[],
    public owner: number,
    public created_by: number,
    public created_at: string,
  ) { }
}

export class CartObj {
  constructor(
    public ancestor: String,
    public id: string,
    public customer: CustomerObj | null,
    public discount_percentage: number,
    public shopping_list: ItemObj[],
    public upls_sku: UplInfoObj[],
    public upls_unique: UplInfoObj[],
    public total_net: number,
    public total_vat: number,
    public total_gross: number,
    public need_invoice: boolean,
    public payment_kind: string,
    public payments: PaymentObj[],
    public payment_balance: number,
    public profit_net: number,
    public owner_uid: number,
    public store_id: number,
    public date_completion: string,
    public payment_duedate: string,
    public created_by: number,
    public created_at: string,
  ) { }
}

export class ItemObj {
  constructor(
    public sku: number,
    public name: string,
    public piece: number,
    public retail_price_net: number,
    public vat: string,
    public retail_price_gross: number,
    public total_retail_price_net: number,
    public total_retail_price_gross: number,
  ) { }
}

export class UplInfoObj {
  constructor(
    public upl_id: string,
    public kind: {
      Sku: { sku: number, piece: number } | null,
      OpenedSku: { product_id: number, amount: number } | null
    },
    public name: string,
    public retail_price_net: number,
    public vat: string,
    public retail_price_gross: number,
    public procurement_net_price: number,
    public best_before: string,
    public depreciated: boolean,
  ) { }
}

export class PaymentObj {
  constructor(
    public id: string,
    public amount: number,
  ) { }
}

export class CustomerObj {
  constructor(
    public id: number,
    public name: string,
    public zip: string,
    public location: string,
    public street: string
  ) { }
}