import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/services/profile/profile.service';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  id: string = this.route.snapshot.paramMap.get("user_id");
  user: Profile = new Profile();

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  // submit = (): Observable<any> => {
  //   return this.userService.update_by_id(this.id, this.user).pipe(
  //     tap(res => this.user = res)
  //   );
  // }

  ngOnInit() {
    this.userService.get_by_id(this.id).subscribe(res => this.user = res);
  }

}
