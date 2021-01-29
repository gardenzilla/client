import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CashService, NewTransaction, Transaction } from 'src/app/services/cash.service';
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
  ) {
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