import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sku, SkuService } from 'src/app/services/sku.service';
import { Upl, UplKind, UplService } from 'src/app/services/upl.service';

@Component({
  selector: 'pdetails-linfo',
  templateUrl: './pdetails-linfo.component.html',
  styleUrls: ['./pdetails-linfo.component.css']
})
export class PdetailsLinfoComponent implements OnInit {

  @Input() sku: number;
  @Input() display_filter: string[] | null = null;
  @Input() display_select: boolean = false;
  @Output() close_callback: EventEmitter<void> = new EventEmitter<void>();
  @Output() upl_select_callback: EventEmitter<string> = new EventEmitter<string>();

  sku_object: Sku | null = null;
  upls: Upl[] = [];

  constructor(
    private skuService: SkuService,
    private uplService: UplService
  ) { }

  loadUpls() {
    this.upls = [];
    if (this.sku) {
      // Load SKU Object
      this.skuService.get_by_id(this.sku).subscribe(
        res => this.sku_object = res
      );
      // Load UPLs
      this.uplService.get_by_sku_and_stock(this.sku, 1).subscribe(
        upl_ids => this.uplService.get_bulk(upl_ids).subscribe(
          res => {
            if (this.display_filter) {
              res.forEach(upl => {
                if (this.display_filter.includes(upl.upl_kind)) {
                  this.upls.push(upl);
                }
              });
            } else {
              this.upls = res;
            }
          }
        )
      );
    }
  }

  exit() {
    this.close_callback.emit();
  }

  selectEvent(upl_id: string) {
    this.upl_select_callback.emit(upl_id);
    this.close_callback.emit();
  }

  ngOnChanges() {
    this.loadUpls();
  }

  ngOnInit(): void {
    this.loadUpls();
  }

}
