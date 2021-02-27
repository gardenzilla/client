import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CashService, NewTransaction, Transaction } from 'src/app/services/cash.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { PrinterBridgeService } from 'src/app/services/printer-bridge.service';
import { Profile } from 'src/app/services/profile/profile.service';
import { PurchaseInfoObj, PurchaseService } from 'src/app/services/purchase.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cash',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  purchases: PurchaseInfoObj[] = [];

  constructor(
    private purchaseService: PurchaseService,
    private invoiceService: InvoiceService,
    private printerService: PrinterBridgeService,
  ) {
  }

  get(purchase_id: string) {
    this.purchaseService.get_by_id(purchase_id).subscribe(
      res => console.log(res)
    );
  }

  getInfo(purchase_id: string) {
    this.purchaseService.get_info_by_id(purchase_id).subscribe(
      res => console.log(res)
    );
  }

  download(internal_id: string) {
    this.invoiceService.get_by_id(internal_id).subscribe(
      res => this.invoiceService.download(res.invoice_id).subscribe(
        res => { console.log(res); this.printerService.print_base64(res.pdf_base64) }
      )
    );
  }

  downloadReceipt(purchase_id: string) {
    this.purchaseService.download_receipt(purchase_id).subscribe(
      res => { console.log(res); this.printerService.print_base64(res.pdf_base64) }
    );
  }

  ngOnInit(): void {
    this.purchaseService.get_all().subscribe(
      res => {
        this.purchaseService.get_bulk_info(res).subscribe(
          res => this.purchases = res
        );
      }
    );
  }

}