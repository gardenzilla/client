import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  constructor(private http: HttpClient) { }
  get_by_id(id: string): Observable<InvoiceDataObj> {
    return this.http.get<InvoiceDataObj>(`/invoice/${id}`);
  }
  download(invoice_id: String): Observable<InvoicePdfObj> {
    return this.http.post<InvoicePdfObj>('/invoice/download', { invoice_id: invoice_id });
  }
}

export class InvoiceDataObj {
  constructor(
    public id: string,
    public purchase_id: string,
    public invoice_id: string,
    public has_error: boolean,
    public created_by: number,
    public created_at: string,
  ) { }
}

export class InvoicePdfObj {
  constructor(
    public pdf_base64: string,
  ) { }
}