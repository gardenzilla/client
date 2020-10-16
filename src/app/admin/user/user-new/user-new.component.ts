import { Component, OnInit } from '@angular/core';
import { Profile, ProfileNew } from 'src/app/class/profile';
import { Model } from 'src/app/class/model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpError } from 'src/app/class/http-error';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  user: ProfileNew = <ProfileNew>{};

  submit = (): Observable<any> => {
    return this.userService.new(this.user).pipe(
      tap((newUser: ProfileNew) => this.router.navigateByUrl(`/user/${newUser.username}`))
    );
  }

  // submit() {
  //   this.http.post<ProfileNew>("/user/new", this.user.data).subscribe((user) => {
  //     this.router.navigateByUrl('./a/user/' + user.username);
  //   }, (err) => this.e.error = err)
  // }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.user.name = '';
    this.user.email = '';
    this.user.phone = '';
    this.user.username = '';
  }

}
