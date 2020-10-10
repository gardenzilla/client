import { Component, OnInit, HostListener } from '@angular/core';
import { Pager } from 'src/app/class/pager';
import { Profile } from 'src/app/class/profile';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Customer } from 'src/app/interface/customer';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-user',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers$: Observable<Customer[]>;

  constructor(private customer_service: CustomerService) { }

  ngOnInit() {
    this.customers$ = this.customer_service.get_all();
    // this.http.get<Profile[]>("/user/all").subscribe((val) => {
    //   val = val.sort((a, b) => a.date_created > b.date_created ? 1 : -1);
    //   this.users.set_data(val);
    //   this.buffer = val;
    // });
    // this.routeSubscription = this.route.queryParams.subscribe(params => {
    //   if (params.message) {
    //     this.param = params.message;
    //   }
    // });
  }
}