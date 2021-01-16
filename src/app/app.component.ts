import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  ActivatedRoute
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  counter: number = 0;
  routerSubs: Subscription;
  loading = false;
  constructor(private title: Title, private router: Router, private route: ActivatedRoute) {
    this.routerSubs = router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const rt = this.getChild(this.route);
      rt.data.subscribe(data => {
        this.title.setTitle(data.title ? data.title : "Gardenzilla");
      });
    });

    // Router loading animation
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.routerSubs.unsubscribe();
  }

  getChild(route: ActivatedRoute) {
    if (route.firstChild) {
      return this.getChild(route.firstChild);
    } else {
      return route;
    }
  }
}