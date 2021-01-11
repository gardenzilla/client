import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { tap } from 'rxjs/operators';
import { ProfileNew, Profile } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  user: ProfileNew = new ProfileNew();

  submit = (): Observable<any> => {
    return this.userService.new(this.user).pipe(
      tap((newUser: Profile) => this.router.navigateByUrl(`/user/${newUser.uid}`))
    );
  }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() { }

}
