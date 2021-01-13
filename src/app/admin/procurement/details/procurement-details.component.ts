import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product, ProductService } from 'src/app/services/product.service';
import { Sku, SkuNew, SkuService } from 'src/app/services/sku.service';
import { Price, PriceHistory, PriceService } from 'src/app/services/price.service';
import { AddSku, AddUpl, Procurement, ProcurementItem, ProcurementService, RemoveSku, UplCandidate } from 'src/app/services/procurement.service';
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
  skus: any = {};
  model_reference: string = "";
  model_delivery_date: string = "";
  model_new_sku: NewProcurementObject = new NewProcurementObject(this.skuService);
  model_edit_sku: SkuEditObject | null = null;

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

  countUpls(sku: number): number {
    let result: number = 0;
    this.procurement.upls.forEach(upl => {
      if (upl.sku == sku) {
        result++;
      }
    });
    return result;
  }

  setModelEditSku(sku: ProcurementItem) {
    this.model_edit_sku = new SkuEditObject(this.procurement, sku);
  }

  setModelNewSku() {
    this.model_new_sku = new NewProcurementObject(this.skuService);
  }

  setModelDeliveryDate() {
    let date = new Date(this.procurement.estimated_delivery_date);
    this.model_delivery_date = date.toISOString().slice(0, 10);
  }

  removeSku(sku: number) {
    this.procurementService.remove_sku(new RemoveSku(this.procurement_id, sku)).subscribe(res => this.procurement = res);
  }

  loadSource() {
    this.sourceService.get_all().subscribe(res => {
      res.forEach(res => {
        this.sources[res.source_id] = res
      })
    });
  }

  loadSkus(ids: number[]) {
    this.skuService.get_bulk(ids).subscribe(res => {
      res.forEach(res => {
        this.skus[res.sku] = res;
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

  callbackAddSku = (): Observable<any> => {
    return this.procurementService.add_sku(new AddSku(this.procurement_id, this.model_new_sku.sku_item)).
      pipe(
        tap(res => {
          this.procurement = res;
          this._loadSkus();
        })
      );
  }

  processUpl(query: string): string {
    let parts: string[] = query.split('/');
    if (parts[parts.length - 2] == 'uinfo') {
      return parts[parts.length - 1];
    }
    return null;
  }

  addUpl(sku: ProcurementItem, upl_id: string, piece: number, best_before: string) {
    upl_id = this.processUpl(upl_id);
    let bdate = best_before.length > 0 ? new Date(best_before).toISOString() : "";
    this.procurementService.add_upl(new AddUpl(this.procurement_id, new UplCandidate(upl_id, sku.sku, +piece, bdate))).
      subscribe(res => {
        this.procurement = res;
        this._loadDependencies();
        this.setModelEditSku(sku);
      });
  }

  _loadSkus() {
    let sku_ids: number[] = [];
    this.procurement.items.forEach(item => sku_ids.push(item.sku));
    this.loadSkus(sku_ids);
  }

  _loadDependencies() {
    this.loadSource();
    this._loadSkus();
  }

  reloadProcurement() {
    this.loadSource();
    this.procurementService.get_by_id(this.procurement_id).subscribe(res => {
      this.procurement = res;
      this._loadSkus();
    });
  }

  ngOnInit(): void {
    this.reloadProcurement();
  }

}

export class NewProcurementObject {
  constructor(private skuService: SkuService) {
    this.sku_search_results = [];
    this.sku_item = new ProcurementItem();
    this.sku_item.ordered_amount = 1;
    this.is_sku_selected = false;
  }
  public sku_item: ProcurementItem;
  public sku_search_results: SearchResult[];
  public is_sku_selected: boolean;
  public selected_sku_name: string = "";
  searchSku(query: string) {
    this.sku_search_results = [];
    if (query.length > 0) {
      this.skuService.find(query).subscribe(ids => {
        this.skuService.get_bulk(ids).subscribe(skus => {
          skus.forEach(sku => this.sku_search_results.push(new SearchResult(sku.sku, sku.display_name)));
        });
      });
    }
  }
  selectSku(sku: number, name: string) {
    this.sku_item.sku = sku;
    this.selected_sku_name = name;
    this.is_sku_selected = true;
  }
}

export class SearchResult {
  constructor(
    public sku: number,
    public name: string
  ) { }
}

export class SkuEditObject {
  constructor(procurement: Procurement, sku: ProcurementItem) {
    this.upls = [];
    procurement.upls.forEach(upl => {
      if (upl.sku == sku.sku) {
        this.upls.push(Object.assign({}, upl));
      }
    });
    this.sku_details = Object.assign({}, sku);
  }
  public upls: UplCandidate[];
  public sku_details: ProcurementItem;
}