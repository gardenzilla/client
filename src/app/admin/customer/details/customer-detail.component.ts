import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address, Customer, CustomerNew, CustomerService } from 'src/app/services/customer/customer.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  id: string = this.route.snapshot.paramMap.get("customer_id");
  customer: Customer = <Customer>{};
  customerUpdate: CustomerNew = <CustomerNew>{};

  constructor(private customerService: CustomerService, private route: ActivatedRoute, private router: Router) {
  }

  submit() {
    this.submitCallback().subscribe();
  }

  submitCallback = (): Observable<Customer> => {
    this.customerUpdate.name = this.customer.name;
    this.customerUpdate.phone = this.customer.phone;
    this.customerUpdate.tax_number = this.customer.tax_number;
    this.customerUpdate.email = this.customer.email;
    this.customerUpdate.zip = this.customer.address.zip;
    this.customerUpdate.location = this.customer.address.location;
    this.customerUpdate.address = this.customer.address.address;

    return this.customerService.update_by_id(this.id, this.customerUpdate)
      .pipe(
        tap(res => this.customer = res)
      );
  }

  ngOnInit() {
    this.customer.address = <Address>{};
    this.customerService.get_by_id(this.id).subscribe(customer => this.customer = customer);
  }

}
