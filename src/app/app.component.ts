import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})


export class AppComponent {
  counter: number = 0;
  routerSubs: Subscription;
  constructor(private title: Title, private router: Router, private route: ActivatedRoute) {
    this.routerSubs = router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const rt = this.getChild(this.route);
      rt.data.subscribe(data => {
        this.title.setTitle(data.title ? data.title : "Gardenzilla");
      });
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