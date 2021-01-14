import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product, ProductService } from 'src/app/services/product.service';
import { Sku, SkuNew, SkuService } from 'src/app/services/sku.service';
import { Price, PriceHistory, PriceService } from 'src/app/services/price.service';
import { AddSku, AddUpl, Procurement, ProcurementItem, ProcurementService, RemoveSku, UplCandidate } from 'src/app/services/procurement.service';
import { Source, SourceService } from 'src/app/services/source.service';
import { ScannerBridgeService } from 'src/app/services/scanner-bridge.service';

@Component({
  selector: 'procurement-details',
  templateUrl: './procurement-details.component.html',
  styleUrls: ['./procurement-details.component.css']
})
export class ProcurementDetailsComponent implements OnInit {

  // Procurement ID provided by URL parameter
  procurement_id: number = +this.route.snapshot.paramMap.get("procurement_id");
  // Loaded Procurement object
  procurement: ProcurementObject = new ProcurementObject(
    this.procurement_id,
    this.skuService,
    this.procurementService,
    this.sourceService);
  // Model to edit SKU
  model_edit_sku: SkuEditObject | null = null;
  // ScannerBridge subscription
  scannerSubscription: Subscription;

  constructor(
    private productService: ProductService,
    private skuService: SkuService,
    private priceService: PriceService,
    private procurementService: ProcurementService,
    private sourceService: SourceService,
    private scannerService: ScannerBridgeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  setModelEditSku(sku: ProcurementItem) {
    this.model_edit_sku = new SkuEditObject(this.procurementService, this.procurement, sku);
  }

  unsetModelEditSku() {
    this.model_edit_sku = null;
  }

  ngOnInit(): void {
    // Subscribe for scanner events
    this.scannerSubscription = this.scannerService.scanner_event.subscribe(code => {
      // Manage what to do when a new UPL is scanned
      if (this.model_edit_sku) {
        this.model_edit_sku.setNewUpl(code);
      }
    });
  }

  ngOnDestroy() {
    // Unsubscribe from scanner service
    // when this component is destroyed.
    if (this.scannerSubscription) {
      this.scannerSubscription.unsubscribe();
    }
  }

}

export class ProcurementObject {
  constructor(
    public procurement_id: number,
    private skuService: SkuService,
    private procurementService: ProcurementService,
    private sourceService: SourceService,
  ) {
    this.init();
  }
  // Procurement data object
  public procurement: Procurement = new Procurement();
  // SKUs required to display procurement SKUs
  public skus: Map<number, Sku> = new Map();
  // Sources required to display procurement source
  public sources: Map<number, Source> = new Map();
  // Update model to reference
  public um_reference: string = "";
  // Update model to delivery date
  public um_delivery_date: string = "";
  // Model to create new SKU
  public model_new_sku: NewSkuObject = new NewSkuObject(this.skuService);
  // Init all the required related
  // data; based on the procurement_id
  init() {
    // Load source info
    this.loadSource();
    // Load procurement object
    this.procurementService.get_by_id(this.procurement_id).subscribe(res => {
      this.procurement = res;
      // Load related sku info
      this.loadSkus();
    });
  }
  // When we have a new version of the procurement object
  // we can put it inside this object
  // and reload all the related data based on it
  reloadWithData(data: Procurement) {
    this.procurement = data;
    this.loadSource();
    this.loadSkus();
  }
  // Get reference to its reference
  getReference(): string {
    return this.procurement.reference;
  }
  // Get rederence to its delivery date
  getDeliveryDate(): string {
    return this.procurement.estimated_delivery_date;
  }
  getItems(): ProcurementItem[] {
    return this.procurement.items;
  }
  // Load sku info
  private loadSkus() {
    // Init an empty sku array
    let sku_ids: number[] = [];
    // Fill it with the procurement contained skus
    this.procurement.items.forEach(item => sku_ids.push(item.sku));
    // Load SKU info in bulk
    this.skuService.get_bulk(sku_ids).subscribe(res => {
      res.forEach(res => {
        this.skus[res.sku] = res;
      })
    });
  }
  // Load source info
  private loadSource() {
    this.sourceService.get_all().subscribe(res => {
      res.forEach(res => {
        this.sources[res.source_id] = res
      })
    });
  }
  // Counts the UPLs by a given SKU
  uplCount(sku: number): number {
    let result: number = 0;
    this.procurement.upls.forEach(upl => {
      if (upl.sku == sku) {
        result++;
      }
    });
    return result;
  }
  // Set update model reference to the stored one
  // to edit
  setUmReference() {
    this.um_reference = this.procurement.reference;
  }
  // Set update model delivery date to the stored one
  // to edit
  setUmDeliveryDate() {
    let date = this.procurement.estimated_delivery_date.length > 0
      ? new Date(this.procurement.estimated_delivery_date)
      : new Date();
    this.um_delivery_date = date.toISOString().slice(0, 10);
  }
  // Set model to create new Sku procurement item object
  setModelNewSku() {
    this.model_new_sku = new NewSkuObject(this.skuService);
  }
  // Callback to set new reference
  callbackSetReference = (): Observable<any> => {
    return this.procurementService.set_reference(this.procurement_id, this.um_reference).
      pipe(
        tap(res => {
          this.procurement = res;
        })
      );
  }
  // Callback to set new delivery date
  callbackSetDeliveryDate = (): Observable<any> => {
    if (this.um_delivery_date == null) {
      console.log("delivery date is null");
      this.um_delivery_date = "";
    }
    return this.procurementService.set_delivery_date(this.procurement_id, new Date(this.um_delivery_date)).
      pipe(
        tap(res => {
          this.procurement = res;
        })
      );
  }
  // Callback to add new SKU
  callbackAddSku = (): Observable<any> => {
    return this.procurementService.add_sku(new AddSku(this.procurement_id, this.model_new_sku.sku_item)).
      pipe(
        tap(res => {
          // Set new procurement object
          // and reload all the necessary info
          this.reloadWithData(res);
        })
      );
  }
  // Remove SKU
  removeSku(sku: number) {
    this.procurementService.remove_sku(new RemoveSku(this.procurement_id, sku)).subscribe(res => this.reloadWithData(res));
  }
}

export class NewSkuObject {
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
  constructor(
    private procurementService: ProcurementService,
    private procurement: ProcurementObject,
    private sku: ProcurementItem,
  ) {
    // Set procurement_ref
    this.procurement_ref = procurement;
    // Set a cloned ProcurementItem object
    this.sku_details = Object.assign({}, sku);
    // Set a new UPL candidate as an empty object
    // when this new edit model constructed
    this.new_upl = new UplCandidate();
    this.new_upl.sku = sku.sku;
  }
  // Reference to the original
  private procurement_ref: ProcurementObject;
  // Here we have the related ProcurementItem
  // object as a clone
  public sku_details: ProcurementItem;
  // New UPL object
  public new_upl: UplCandidate;
  // Get UPLs filtered from the ProcurementObject
  // UPLs (only array of refs to the parent object items)
  getUpls(): UplCandidate[] {
    let res: UplCandidate[] = [];
    this.procurement_ref.procurement.upls.forEach(upl => {
      if (upl.sku == this.sku.sku) {
        res.push(upl);
      }
    });
    return res;
  }
  // Try to add new UPL to the given SKU
  addNewUpl() {
    // Process best before date
    let bdate = this.new_upl.best_before.length > 0
      // Set to be a date
      ? new Date(this.new_upl.best_before).toISOString()
      // Or an empty string
      : "";
    // Try to add new UPL calling
    // the procurement service
    this.procurementService.add_upl(
      new AddUpl(this.procurement_ref.procurement_id,
        new UplCandidate(this.new_upl.upl_id, this.new_upl.sku, +this.new_upl.upl_piece, bdate))).
      subscribe(res => {
        // Update parent object
        this.procurement_ref.reloadWithData(res);
      });
  }
  // Set up new UPL model
  // with a given UPL ID
  // Aimed to use with scanner_bridge
  setNewUpl(upl_id: string) {
    // If a new upl_id is already given
    // then we try to add it, and then
    // load the new form
    if (this.new_upl.upl_id != "") {
      this.addNewUpl();
    }
    this.resetNewUpl();
    this.new_upl.upl_id = upl_id;
  }
  private resetNewUpl() {
    this.new_upl.upl_id = "";
    this.new_upl.upl_piece = 1;
    this.new_upl.best_before = "";
  }
}