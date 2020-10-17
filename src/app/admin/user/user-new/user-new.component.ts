import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { tap } from 'rxjs/operators';
import { ProfileNew } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  user: ProfileNew = new ProfileNew();

  submit = (): Observable<any> => {
    return this.userService.new(this.user).pipe(
      tap((newUser: ProfileNew) => this.router.navigateByUrl(`/user/${newUser.username}`))
    );
  }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {}

}
