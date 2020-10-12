import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewPassword } from 'src/app/class/new-password';
import { Profile, ProfileNew } from 'src/app/class/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  get(): Observable<Profile> {
    return this.http.get<Profile>("/profile/");
  }

  update(profile: ProfileNew): Observable<Profile> {
    return this.http.post<Profile>("/profile", profile);
  }

  updatePassword(password: NewPassword): Observable<any> {
    return this.http.post<any>("/profile/new_password", password);
  }

}
