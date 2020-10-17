import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NewPassword } from 'src/app/class/new-password';
import { LoginService } from 'src/app/services/login/login.service';
import { Observable } from 'rxjs';
import { Profile, ProfileService } from 'src/app/services/profile/profile.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  profile: Profile = new Profile();
  password: NewPassword = new NewPassword();

  constructor(private profileService: ProfileService, private loginService: LoginService) {
    profileService.get().subscribe(res => this.profile = res);
  }

  submitProfile = (): Observable<Profile> => {
    return this.profileService.update(this.profile).pipe(tap(res => this.profile = res));
  }

  submitPwd = (): Observable<any> => {
    return this.profileService.updatePassword(this.password);
  }

  ngOnInit() {}
}
