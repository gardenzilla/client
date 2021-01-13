import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product, ProductService } from 'src/app/services/product.service';
import { Sku, SkuNew, SkuService } from 'src/app/services/sku.service';
import { Price, PriceHistory, PriceService } from 'src/app/services/price.service';
import { Procurement, ProcurementService } from 'src/app/services/procurement.service';
import { SourceService } from 'src/app/services/source.service';

@Component({
  selector: 'procurement-details',
  templateUrl: './procurement-details.component.html',
  styleUrls: ['./procurement-details.component.css']
})
export class ProcurementDetailsComponent implements OnInit {

  procurement_id: number = +this.route.snapshot.paramMap.get("procurement_id");
  procurement: Procurement = new Procurement();
  sources: any = {};
  model_reference: string = "";
  model_delivery_date: string = "";

  constructor(
    private productService: ProductService,
    private skuService: SkuService,
    private priceService: PriceService,
    private procurementService: ProcurementService,
    private sourceService: SourceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  setModelDeliveryDate() {
    let date = new Date(this.procurement.estimated_delivery_date);
    this.model_delivery_date = date.toISOString().slice(0, 10);
  }

  loadSource() {
    this.sourceService.get_all().subscribe(res => {
      res.forEach(res => {
        this.sources[res.source_id] = res
      })
    });
  }

  callbackSetReference = (): Observable<any> => {
    return this.procurementService.set_reference(this.procurement_id, this.model_reference).
      pipe(
        tap(res => {
          this.procurement = res;
        })
      );
  }

  callbackDeliveryDate = (): Observable<any> => {
    return this.procurementService.set_delivery_date(this.procurement_id, new Date(this.model_delivery_date)).
      pipe(
        tap(res => {
          this.procurement = res;
        })
      );
  }

  ngOnInit(): void {
    this.loadSource();
    this.procurementService.get_by_id(this.procurement_id).subscribe(res => this.procurement = res);
  }

}
