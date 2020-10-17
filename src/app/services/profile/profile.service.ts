import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewPassword } from 'src/app/class/new-password';

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

export class Profile {
  constructor(
      public username: string = "",
      public name: string = "",
      public email: string = "",
      public phone: string = "",
      public created_by: string = "",
      public date_created: Date = null,
      public customers: string[] = []
  ) { }
}

export class ProfileNew {
  constructor(
      public username: string = "",
      public name: string = "",
      public email: string = "",
      public phone: string = "",
  ) { }
}

