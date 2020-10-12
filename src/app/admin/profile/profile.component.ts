import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ErrorResponse } from 'src/app/class/error-response';
import { HttpClient } from '@angular/common/http';
import { Profile } from 'src/app/class/profile';
import { NewPassword } from 'src/app/class/new-password';
import { LoginService } from 'src/app/services/login/login.service';
import { Model } from 'src/app/class/model';
import { Observable } from 'rxjs';
import { ButtonSubmitComponent } from '../partial/button-submit/button-submit.component';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { HttpError } from 'src/app/interface/error';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  profile: Profile = <Profile>{};
  password: NewPassword = <NewPassword>{};

  constructor(private profileService: ProfileService, private loginService: LoginService) {
    profileService.get().subscribe(res => this.profile = res);
  }

  submitProfile = (): Observable<Profile> => {
    return this.profileService.update(this.profile).pipe(tap(res => this.profile = res));
  }

  submitPwd = (): Observable<any> => {
    return this.profileService.updatePassword(this.password);
  }

  ngOnInit() {
    // this.profile.status.subscribe((val) => this.loginService.setUserName(val.name));
  }
}
