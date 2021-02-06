import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Price, PriceService } from 'src/app/services/price.service';
import { Procurement, ProcurementService } from 'src/app/services/procurement.service';
import { Product, ProductService } from 'src/app/services/product.service';
import { ScannerBridgeService } from 'src/app/services/scanner-bridge.service';
import { Sku, SkuService } from 'src/app/services/sku.service';
import { NewSource, Source, SourceService } from 'src/app/services/source.service';
import { Upl, UplLocation, UplService } from 'src/app/services/upl.service';

@Component({
  selector: 'app-user',
  templateUrl: './upl.component.html',
  styleUrls: ['./upl.component.scss']
})
export class UplComponent implements OnInit {
  upl_id: string = '';
  upl: Upl | null = null;
  product: Product | null = null;
  sku: Sku | null = null;
  procurement: Procurement | null = null;
  price: Price | null = null;
  found: boolean = false;
  scannerSubscription: Subscription;

  constructor(
    private skuService: SkuService,
    private productService: ProductService,
    private procurementService: ProcurementService,
    private priceService: PriceService,
    private scannerService: ScannerBridgeService,
    private uplService: UplService,
  ) { }

  getKind(): string {
    if (this.upl.upl_kind["Sku"]) {
      return "sku";
    }
    if (this.upl.upl_kind["BulkSku"]) {
      return "gyűjtő sku";
    }
    if (this.upl.upl_kind["OpenedSku"]) {
      return "bontott sku";
    }
    if (this.upl.upl_kind["DerivedProduct"]) {
      return "kimért termék";
    }
    return "?";
  }

  getSku(): number | null {
    if (this.upl.upl_kind["Sku"]) {
      return this.upl.upl_kind["Sku"].sku;
    }
    if (this.upl.upl_kind["BulkSku"]) {
      return this.upl.upl_kind["BulkSku"].sku;
    }
    if (this.upl.upl_kind["OpenedSku"]) {
      return this.upl.upl_kind["OpenedSku"].sku;
    }
    return null;
  }

  getLocation(): [string, string | number] {
    if (this.upl.location == UplLocation.Cart) {
      return ["kosár", this.upl.location_id]
    } else if (this.upl.location == UplLocation.Stock) {
      return ["raktár", this.upl.location_id]
    } else if (this.upl.location == UplLocation.Delivery) {
      return ["szállítás", this.upl.location_id];
    } else if (this.upl.location == UplLocation.Discard) {
      return ["selejtezett", this.upl.location_id];
    } else {
      return ["ismeretlen", "ismeretlen"];
    }
  }

  loadUpl() {
    this.found = false;
    this.uplService.get_by_id(this.upl_id).subscribe(
      res => {
        if (res) {
          this.found = true;
          this.upl = res;
          console.log(res);
          this.productService.get_by_id(res.product_id).subscribe(
            res => {
              this.product = res
              if (this.getSku()) {
                this.skuService.get_by_id(this.getSku()).subscribe(
                  res => this.sku = res
                );
                this.priceService.get_by_id(this.getSku()).subscribe(
                  res => this.price = res
                );
              }
            }
          );
          this.procurementService.get_by_id(res.procurement_id).subscribe(
            res => this.procurement = res
          );
        } else {
          this.uplService.get_by_id_archive(this.upl_id).subscribe(
            res => {
              if (res) {
                this.found = true;
                this.upl = res;
                console.log(res);
                this.productService.get_by_id(res.product_id).subscribe(
                  res => {
                    this.product = res
                    if (this.getSku()) {
                      this.skuService.get_by_id(this.getSku()).subscribe(
                        res => this.sku = res
                      );
                      this.priceService.get_by_id(this.getSku()).subscribe(
                        res => this.price = res
                      );
                    }
                  }
                );
                this.procurementService.get_by_id(res.procurement_id).subscribe(
                  res => this.procurement = res
                );
              }
            }
          )
        }
      },
      err => this.uplService.get_by_id_archive(this.upl_id).subscribe(
        res => this.found = false
      )
    );
  }

  openUpl() {
    this.uplService.open(this.upl.upl_id).subscribe(
      res => this.upl = res
    );
  }

  closeUpl() {
    this.uplService.close(this.upl.upl_id).subscribe(
      res => this.upl = res
    );
  }

  mergeBack() {
    if (this.upl.derived_from) {
      let parent_upl_id = this.upl.derived_from;
      this.uplService.merge_back(this.upl.upl_id).subscribe(
        res => {
          if (res) {
            this.upl = res;
          } else {
            this.upl_id = parent_upl_id;
            this.loadUpl();
          }
        }
      );
    }
  }

  ngOnInit() {
    // Subscribe for scanner events
    this.scannerSubscription = this.scannerService.scanner_event.subscribe(code => {
      this.upl_id = code;
      this.loadUpl();
    });
  }

  ngOnDestroy() {
    if (this.scannerSubscription) {
      this.scannerSubscription.unsubscribe();
    }
  }
}