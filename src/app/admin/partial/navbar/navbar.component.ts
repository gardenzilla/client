import { Component, OnInit, HostListener, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Router, Event, NavigationEnd, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { ErrorResponse } from 'src/app/class/error-response';
import { Notification } from 'src/app/class/notification';
import { RouterParamService } from 'src/app/services/router-param/router-param.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() is_full?: boolean = false;

  notifications: Notification[] = [];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private params: RouterParamService
  ) {
    // Register username observer
    this.loginService.userName.subscribe((val) => this.username = val);
  }

  isActive: boolean = false;
  quick$: Observable<ErrorResponse>;
  routerObserver: Subscription;
  username: string;

  ngOnInit() {
    this.loginService.getUserName();
  }

  logout() {
    let url = this.router.url;
    this.loginService.logout(url);
    this.router.navigateByUrl('/login');
  }

}
