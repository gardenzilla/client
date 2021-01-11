import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from 'src/app/services/product.service';
import { DataTable } from 'src/app/class/data-table';
import { ErrorService } from 'src/app/services/error/error.service';
import { Price, PriceService } from 'src/app/services/price.service';

@Component({
  selector: 'app-user',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  source_ids: number[] = [];
  source: Product[] = [];
  page_count: number = 15;
  current_page: number = 0;
  query: string = "";
  // prices: any = {};

  constructor(
    private product_service: ProductService,
    private price_service: PriceService,
    private errorService: ErrorService) { }

  ngOnInit() {
    this.product_service.get_all().subscribe(res => {
      this.source_ids = res;
      this.load();
    });
  }

  find() {
    this.current_page = 0;
    this.source = [];
    this.product_service.find(this.query).subscribe(res => {
      this.source_ids = res;
      this.load();
    });
  }

  load() {
    this.current_page++;
    this.product_service
      .get_bulk(this.source_ids.slice(
        (this.current_page - 1) * this.page_count, this.page_count * this.current_page))
      .subscribe(res => {
        this.source.push(...res);
      });
    // this.price_service
    //   .get_bulk(this.source_ids.slice(
    //     (this.current_page - 1) * this.page_count, this.page_count * this.current_page))
    //   .subscribe(res => {
    //     Object.assign(this.prices, res.map(price => [price.sku, price]));
    //   });
  }
}