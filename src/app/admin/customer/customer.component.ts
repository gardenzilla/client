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
  customers: DataTable<Customer> = new DataTable([], 2);
  filterString: string = '';
  filter: (c: Customer) => boolean;

  constructor(private customer_service: CustomerService,
    private errorService: ErrorService) { }

  applyFilter() {
    this.filter = (c: Customer) => { return c.name.toLocaleLowerCase().includes(this.filterString); };
  }

  removeFilter() {
    this.filter = null;
    this.filterString = '';
  }

  ngOnInit() {
    this.customer_service.get_all().subscribe(res => {
      this.customers.setData(res);
    });
  }
}