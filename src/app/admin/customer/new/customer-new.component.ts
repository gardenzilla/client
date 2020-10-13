import { Component, OnInit } from '@angular/core';
import { Profile, ProfileNew } from 'src/app/class/profile';
import { Model } from 'src/app/class/model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpError } from 'src/app/class/http-error';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { Address, Customer, CustomerNew } from 'src/app/interface/customer';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrls: ['./customer-new.component.scss']
})
export class CustomerNewComponent implements OnInit {

  customer: CustomerNew = {} as CustomerNew;

  constructor(private customerService: CustomerService, private router: Router) { }

  submit = (): Observable<Customer> => {
    return this.customerService.new(this.customer).pipe(
      tap(newCustomer => this.router.navigateByUrl(`/customer/${newCustomer.id}`))
    );
  }

  ngOnInit() {
    this.customer.address = '';
    this.customer.email = '';
    this.customer.location = '';
    this.customer.name = '';
    this.customer.phone = '';
    this.customer.tax_number = '';
    this.customer.zip = '';
  }

}
