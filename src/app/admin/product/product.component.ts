import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from 'src/app/services/product.service';
import { DataTable } from 'src/app/class/data-table';

@Component({
  selector: 'app-user',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: DataTable<Product>;

  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.productService.get_all().subscribe(res => this.products = new DataTable(res));
  }
}