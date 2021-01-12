import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SourceService {
  constructor(private http: HttpClient) { }
  new(customer: NewSource): Observable<Source> {
    return this.http.post<Source>("/source/new", customer);
  }
  get_by_id(id: number): Observable<Source> {
    return this.http.get<Source>("/source/" + id);
  }
  get_all(): Observable<Source[]> {
    return this.http.get<Source[]>("/source/all");
  }
  update_by_id(id: number, source: Source): Observable<Source> {
    return this.http.put<Source>(`/source/${id}`, source);
  }
}

export class Source {
  constructor(
    public source_id: number,
    public name: string,
    public address: string,
    public email: string[],
    public phone: string[],
    public created_at: string,
    public created_by: number
  ) { }
}

export class NewSource {
  constructor(
    public name: string,
    public address: string,
    public email: string[],
    public phone: string[],
  ) { }
}