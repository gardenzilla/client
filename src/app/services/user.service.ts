import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile, ProfileNew } from './profile/profile.service';

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
  update_by_id(id: string, user: Profile): Observable<Profile> {
    return this.http.put<Profile>(`/user/${id}`, user);
  }
  new(customer: ProfileNew): Observable<Profile> {
    return this.http.post<Profile>("/user/new", customer);
  }
}
