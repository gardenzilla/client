import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from 'src/app/class/chart';
import { DataTable } from 'src/app/class/data-table';
import { Customer } from 'src/app/interface/customer';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { ErrorService } from 'src/app/services/error/error.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customers$: Observable<Customer[]>;
  customers: DataTable<Customer> = new DataTable([]);

  constructor(private customer_service: CustomerService,
    private errorService: ErrorService) { }

  ngOnInit() {
    this.customers$ = this.customer_service.get_all();
    this.customer_service.get_all().subscribe(res => this.customers.setData(res));
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