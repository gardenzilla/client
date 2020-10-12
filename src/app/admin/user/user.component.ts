import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/class/profile';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: Profile[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Profile[]>("/user/all").subscribe((val) => {
      this.users = val;
    });
  }
}
