import { Component, OnInit, HostListener, ViewChild, ElementRef, ComponentRef, ViewChildren, Host, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ModalComponent } from '../partial/modal/modal.component';
import { Sku, SkuService } from 'src/app/services/sku.service';
import { ScannerBridgeService } from 'src/app/services/scanner-bridge.service';
import { Subscription } from 'rxjs';
import { Upl } from 'src/app/services/upl.service';
import { Product, ProductService } from 'src/app/services/product.service';
import { Price, PriceService } from 'src/app/services/price.service';

@Component({
  selector: 'upl-edit',
  templateUrl: './pos-upledit.component.html',
  styleUrls: ['./pos-upledit.component.scss']
})
export class PosUplEditComponent implements OnInit {

  @Input() upl: Upl;
  @Output() close_event: EventEmitter<void> = new EventEmitter<void>();
  @Output() add_upl_event: EventEmitter<string> = new EventEmitter<string>();

  split_mode: boolean = false;
  scanner_subscription: Subscription | null = null;
  code: string = "";
  code_manual: boolean = false;
  code_ok: boolean = false;
  product: Product;
  sku: Sku;
  price: Price;

  constructor(
    private scannerService: ScannerBridgeService,
    private productService: ProductService,
    private skuService: SkuService,
    private priceService: PriceService
  ) { }

  putInCart() {
    this.add_upl_event.emit(this.upl.upl_id);
    this.close_event.emit();
  }

  splitUpl() {
    console.log('Split UPL');
  }

  closeForm() {
    this.close_event.emit();
    if (this.scanner_subscription) {
      this.scanner_subscription.unsubscribe();
    }
  }

  addUpl() {
    this.add_upl_event.emit(this.code);
    this.close_event.emit();
  }

  ngOnInit() {
    this.scannerService.scanner_event.subscribe(code => this.code);
    this.productService.get_by_id(this.upl.product_id).subscribe(
      res => this.product = res
    );
    this.skuService.get_by_id(this.upl.sku).subscribe(
      res => this.sku = res
    );
  }

  ngOnDestroy() {
    if (this.scanner_subscription) {
      this.scanner_subscription.unsubscribe();
    }
  }
}