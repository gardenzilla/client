import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ErrorResponse } from 'src/app/class/error-response';
import { HttpClient } from '@angular/common/http';
import { Profile } from 'src/app/class/profile';
import { NewPassword } from 'src/app/class/new-password';
import { LoginService } from 'src/app/services/login/login.service';
import { Model } from 'src/app/class/model';
import { Observable } from 'rxjs';
import { ButtonSubmitComponent } from '../partial/button-submit/button-submit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  profile: Profile = <Profile>{};
  password: NewPassword = <NewPassword>{};

  isFormLoading: boolean = false;

  constructor(private http: HttpClient, private loginService: LoginService) {
    this.http.get<Profile>('/profile').subscribe(res => this.profile = res);
  }

  submitProfile() {
    this.http.post<Profile>('/profile', this.profile).subscribe(() => this.isFormLoading = false);
  }

  submitPwd() { }

  ngOnInit() {
    // this.profile.status.subscribe((val) => this.loginService.setUserName(val.name));
  }
}
