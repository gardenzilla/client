import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer, CustomerNew, CustomerService } from 'src/app/services/customer/customer.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrls: ['./customer-new.component.scss']
})
export class CustomerNewComponent implements OnInit {

  customer: CustomerNew = new CustomerNew();

  constructor(private customerService: CustomerService, private router: Router) { }

  submit = (): Observable<Customer> => {
    return this.customerService.new(this.customer).pipe(
      tap(newCustomer => this.router.navigateByUrl(`/customer/${newCustomer.id}`))
    );
  }

  ngOnInit() {}

}
