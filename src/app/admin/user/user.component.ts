import { Component, OnInit } from '@angular/core';
import { DataTable } from 'src/app/class/data-table';
import { Profile } from 'src/app/services/profile/profile.service';
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
