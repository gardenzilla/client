import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTable } from 'src/app/class/data-table';
import { Customer, CustomerService } from 'src/app/services/customer/customer.service';
import { ErrorService } from 'src/app/services/error/error.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  source_ids: number[] = [];
  source: Customer[] = [];
  page_count: number = 15;
  current_page: number = 1;
  query: string = "";

  constructor(
    private route: ActivatedRoute,
    private customer_service: CustomerService,
    private errorService: ErrorService) { }

  ngOnInit() {
    this.route.data.subscribe((
      data: { "data": { ids: number[], customers: Customer[] } }) => {
      this.source_ids = data.data.ids;
      this.source = data.data.customers;
    });
    // this.customer_service.get_all().subscribe(res => {
    //   this.source_ids = res;
    //   this.load();
    // });
  }

  find() {
    this.current_page = 0;
    this.source = [];
    this.customer_service.find(this.query).subscribe(res => {
      this.source_ids = res;
      this.load();
    });
  }

  load() {
    this.current_page++;
    this.customer_service
      .get_bulk(this.source_ids.slice(
        (this.current_page - 1) * this.page_count, this.page_count * this.current_page))
      .subscribe(res => {
        this.source.push(...res);
      });
  }
}
