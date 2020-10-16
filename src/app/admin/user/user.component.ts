import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/class/profile';
import { HttpClient } from '@angular/common/http';
import { DataTable } from 'src/app/class/data-table';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: DataTable<Profile>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.get_all().subscribe((res) => this.users = new DataTable(res));
  }
}
