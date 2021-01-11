import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer, CustomerNew, CustomerService } from 'src/app/services/customer/customer.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  id: number = +this.route.snapshot.paramMap.get("customer_id");
  customer: Customer = <Customer>{};

  constructor(private customerService: CustomerService, private route: ActivatedRoute, private router: Router) {
  }

  submit() {
    this.submitCallback().subscribe();
  }

  submitCallback = (): Observable<Customer> => {
    return this.customerService.update_by_id(this.customer)
      .pipe(
        tap(res => this.customer = res)
      );
  }

  ngOnInit() {
    this.customerService.get_by_id(this.id).subscribe(customer => this.customer = customer);
  }

}
