import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product, ProductService } from 'src/app/services/product.service';
import { Sku, SkuNew, SkuService } from 'src/app/services/sku.service';
import { Price, PriceHistory, PriceService } from 'src/app/services/price.service';

@Component({
  selector: 'app-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  sku: number = +this.route.snapshot.paramMap.get("sku");
  product: Product = new Product();
  skus: Sku[] = [];
  prices: any = {};
  sku_update: Sku = new Sku();
  new_price_model: Price = new Price();
  price_history: PriceHistory[] = [];
  _new_sku: SkuNew = new SkuNew();
  _selected_price_sku_name: string = '';

  constructor(
    private productService: ProductService,
    private skuService: SkuService,
    private price_service: PriceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  submit = (): Observable<any> => {
    return this.productService.update(this.sku, this.product).pipe(
      tap(res => this.product = res)
    );
  };

  setSkuUpdate(sku: Sku) {
    this.sku_update = sku;
  }

  updateSku = (): Observable<any> => {
    return this.skuService.update(this.sku_update.sku, this.sku_update).pipe(
      tap(res => {
        let i = this.skus.findIndex(item => item.sku == this.sku_update.sku);
        this.skus.splice(i, 1, res);
      })
    );
  }

  setPerishable() {
    this.productService.set_perishable(this.product.product_id, this.product.perishable).subscribe(
      res => this.product = res
    );
  }

  setProductDiscontinued() {
    this.productService.set_discontinued(this.product.product_id, this.product.discontinued).subscribe(
      res => this.product = res
    );
  }

  setSkuDiscontinued() {
    this.skuService.set_discontinued(this.sku_update.sku, this.sku_update.discontinued).subscribe(
      res => {
        let i = this.skus.findIndex(item => item.sku == this.sku_update.sku);
        this.skus.splice(i, 1, res);
      },
      err => {
        this.sku_update.discontinued = !this.sku_update.discontinued;
      }
    );
  }

  setSkuDivisible() {
    this.skuService.set_divide(this.sku_update.sku, this.sku_update.can_divide).subscribe(
      res => {
        let i = this.skus.findIndex(item => item.sku == this.sku_update.sku);
        this.skus.splice(i, 1, res);
      },
      err => {
        this.sku_update.can_divide = !this.sku_update.can_divide;
      }
    );
  }

  createSku = (): Observable<any> => {
    this._new_sku.product_id = this.product.product_id;
    return this.skuService.new(this._new_sku).pipe(
      tap(res => {
        this.skus.push(res);
      })
    );
  }

  setNewPrice = (): Observable<any> => {
    return this.price_service.new(this.new_price_model).pipe(
      tap(res => {
        this.prices[this.new_price_model.sku] = res
        this.loadPriceHistory(this.new_price_model.sku);
      })
    );
  }

  loadPrice(sku: number) {
    if (this.prices[sku]) {
      this.new_price_model = this.prices[sku];
    } else {
      this.new_price_model = new Price(sku);
    }
  }

  loadPriceHistory(sku: number) {
    this.price_service.get_price_history(sku).subscribe(res => this.price_history = res.reverse());
  }

  helperSetPriceGross() {
    if (this.new_price_model.vat == '27') {
      this.new_price_model.price_gross_retail = Math.round(this.new_price_model.price_net_retail * 1.27);
    }
  }

  helperSetPriceNet() {
    if (this.new_price_model.vat == '27') {
      this.new_price_model.price_net_retail = Math.round(this.new_price_model.price_gross_retail / 1.27);
    }
  }

  load() {
    this.productService.get_by_id(this.sku).subscribe(res => {
      this.product = res;
      this.skuService.get_bulk(this.product.skus).subscribe(res => {
        this.skus = res.sort((a, b) => +a.quantity - +b.quantity);
        this.price_service
          .get_bulk(this.product.skus)
          .subscribe(res => {
            res.forEach(price => {
              this.prices[price.sku] = price;
            })
          });
      });
    });
  }

  ngOnInit(): void {
    this.load();
  }

}
