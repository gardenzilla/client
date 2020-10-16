import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile, ProfileNew } from '../class/profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  get_all(): Observable<Profile[]> {
    return this.http.get<Profile[]>("/user/all");
  }
  get_by_id(id: string): Observable<Profile> {
    return this.http.get<Profile>("/user/" + id);
  }
  new(customer: ProfileNew): Observable<Profile> {
    return this.http.post<Profile>("/user/new", customer);
  }
}
