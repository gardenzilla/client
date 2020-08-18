import { Component, OnInit, HostListener } from '@angular/core';
import { Pager } from 'src/app/class/pager';
import { Profile } from 'src/app/class/profile';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  routeSubscription: Subscription;

  filter: string = "";
  users: Pager<Profile> = new Pager([], 10);
  buffer: Profile[] = null;
  param: string = "";
  params: Obj = {
    message: "",
    page: 0,
  };

  filterSubmit() {
    /**
     * Filter data
     */
    this.users.data = this.buffer.filter((c) =>
      c.name.toUpperCase().includes(this.filter.toUpperCase()));
    /**
     * Reset pagination
     */
    this.users.navigate_to(1);
  }

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  // Hot keys tutorial
  // https://netbasal.com/diy-keyboard-shortcuts-in-your-angular-application-4704734547a2
  @HostListener('document:keydown.f3', ['$event'])
  // QueryParams tutorial
  // https://www.digitalocean.com/community/tutorials/angular-query-parameters
  demo(event: Event) {
    event.preventDefault();
    this.router.navigate(['./'], { queryParams: this.goto(9), queryParamsHandling: "merge", relativeTo: this.route });
  }

  goto(page: number): Obj {
    this.params.page = page;
    this.params.message = "Wohoo";
    return this.params;
  }

  ngOnInit() {
    this.http.get<Profile[]>("/user/all").subscribe((val) => {
      val = val.sort((a, b) => a.date_created > b.date_created ? 1 : -1);
      this.users.set_data(val);
      this.buffer = val;
    });
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      if (params.message) {
        this.param = params.message;
      }
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}

export class Obj {
  message: string;
  page: number;
}