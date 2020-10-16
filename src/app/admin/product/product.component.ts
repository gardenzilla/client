import { Component, OnInit, HostListener, ViewChild, ElementRef, ComponentRef, ViewChildren, Host } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable, from, interval, of, BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModalComponent } from '../partial/modal/modal.component';
import { ElementSchemaRegistry, NullTemplateVisitor } from '@angular/compiler';
import { ProductService } from 'src/app/services/product.service';
import { DataTable } from 'src/app/class/data-table';
import { Product } from 'src/app/class/product';
import { Data } from 'src/app/class/chart';

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