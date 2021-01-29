import { Component, OnInit, HostListener, ViewChild, ElementRef, ComponentRef, ViewChildren, Host } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ModalComponent } from '../partial/modal/modal.component';
import { CartObj, CartService, ItemObj, UplInfoObj } from 'src/app/services/cart.service';
import { Sku, SkuService } from 'src/app/services/sku.service';
import { Customer, CustomerService } from 'src/app/services/customer/customer.service';
import { ScannerBridgeService } from 'src/app/services/scanner-bridge.service';
import { Subscription } from 'rxjs';
import { Price, PriceService } from 'src/app/services/price.service';

@Component({
  selector: 'app-user',
  templateUrl: './pos-details.component.html',
  styleUrls: ['./pos-details.component.scss']
})
export class PosDetailsComponent implements OnInit {

  cart_id: string = this.route.snapshot.paramMap.get("cart_id");
  cart: CartObj | null = null;
  search_query: string = "";
  search_result_sku: Sku[] = [];
  search_result_prices: Map<number, number> = new Map();
  search_result_customer: Customer[] = [];

  upl_mode_out: boolean = false;

  payment_modal: number = 0;
  payment_method_model: string = "Cash";

  search_mode: string = 'sku'; // sku | customer | upl

  search_modal_active: boolean = false;

  scannerSubscription: Subscription;

  model_sku_edit: ItemObj | null = null;

  edit_sku: number | null = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private cartService: CartService,
    private skuService: SkuService,
    private scannerService: ScannerBridgeService,
    private priceService: PriceService,
    private customerService: CustomerService
  ) { }

  @ViewChild('searchModal') searchModal: ModalComponent;
  @HostListener('document:keydown.f2', ['$event'])
  displaySearch(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.searchModal.open();
  }

  setEditSku(sku: number) {
    this.edit_sku = sku;
    this.loadEditSku();
  }

  resetSkuPiece() {
    if (this.model_sku_edit) {
      this.cartService.set_sku_piece(this.cart_id, this.model_sku_edit.sku, this.model_sku_edit.piece).subscribe(
        res => this.cart = res
      );
    }
  }

  loadEditSku() {
    if (this.edit_sku) {
      this.cart.shopping_list.forEach(i => {
        if (i.sku == this.edit_sku) {
          // Set a cloned sku to model_sku_edit
          this.model_sku_edit = Object.assign({}, i);
        }
      });
    }
  }

  skuInCart(sku: number): boolean {
    let res = false;
    this.cart.shopping_list.forEach(item => {
      if (item.sku == sku) {
        res = true;
      }
    });
    return res;
  }

  isVoid(): boolean {
    return true;
  }
  void() { }

  loadCart() {
    this.cartService.get_by_id(this.cart_id).subscribe(res => this.cart = res);
  }

  addCustomer(customer_id: number) {
    this.cartService.add_customer(this.cart_id, customer_id).subscribe(res => this.cart = res);
  }

  removeCustomer() {
    this.cartService.remove_customer(this.cart_id).subscribe(res => this.cart = res);
  }

  closeCart() {
    this.cartService.close(this.cart_id).subscribe(res => {
      this.router.navigateByUrl(`/pos`);
    });
  }

  manageSearch() {
    let query = this.search_query;
    if (query.charAt(0) == '@') {
      this.search_mode = 'customer';
      this.searchCustomer(query.slice(1));
    } else if (query.charAt(0) == '#') {
      this.search_mode = 'upl';
      this.manageScannerUpl(query.slice(1));
    } else {
      this.search_mode = 'sku';
      this.searchProduct(query.slice(1));
    }
  }

  searchCustomer(query: string) {
    this.search_result_customer = [];
    this.customerService.find(query).subscribe(ids => {
      this.customerService.get_bulk(ids).subscribe(customers => {
        this.search_result_customer = customers;
      });
    });
  }

  searchProduct(query: string) {
    this.search_result_sku = [];
    this.skuService.find(this.search_query).subscribe(res => {
      this.skuService.get_bulk(res).subscribe(res => {
        this.search_result_sku = res;

        // Init an empty sku array
        let sku_ids: number[] = [];
        res.forEach(sku => sku_ids.push(sku.sku));
        this.priceService.get_bulk(sku_ids).subscribe(res => {
          res.forEach(res => {
            this.search_result_prices[res.sku] = res.price_gross_retail;
          })
        });
      });
    });
  }

  addSku(sku: number) {
    this.cartService.add_sku(this.cart_id, sku, 1).subscribe(res => this.cart = res);
  }

  removeSku(sku: number) {
    if (!confirm('Biztosan?')) {
      return false;
    }
    this.cartService.remove_sku(this.cart_id, sku).subscribe(res => this.cart = res);
  }

  addPayment(kind: string, amount: number) {
    if (!confirm('Biztosan?')) {
      return false;
    }
    this.cartService.add_payment(this.cart_id, kind, +amount).subscribe(res => this.cart = res);
  }

  addUpl(upl_id: string) {
    this.cartService.add_upl(this.cart_id, upl_id).subscribe(res => {
      this.cart = res;
      this.loadEditSku();
    });
  }

  removeUpl(upl_id: string) {
    if (!confirm('Biztosan?')) {
      return false;
    }
    this.cartService.remove_upl(this.cart_id, upl_id).subscribe(res => {
      this.cart = res;
      this.loadEditSku();
    });
  }

  getUplcountBySku(sku: number): number {
    let count = 0;
    this.cart.upls_sku.forEach(upl => {
      if (upl.kind.Sku) {
        if (upl.kind.Sku.sku == sku) {
          count = count + upl.kind.Sku.piece;
        }
      }
    });
    return count;
  }

  getSkuRelatedUpls(sku: number): UplInfoObj[] {
    let res: UplInfoObj[] = [];
    this.cart.upls_sku.forEach(upl => {
      if (upl.kind.Sku) {
        if (upl.kind.Sku.sku == sku) {
          res.push(upl);
        }
      }
    });
    return res;
  }

  manageScannerUpl(code: string) {
    if (!this.upl_mode_out) {
      this.cartService.add_upl(this.cart_id, code).subscribe(res => {
        this.cart = res;
      },
        err => {
          console.log(err);
          this.scannerService.sendError();
        });
    } else {
      this.cartService.remove_upl(this.cart_id, code).subscribe(res => {
        this.cart = res;
      },
        err => {
          console.log(err);
          this.scannerService.sendError();
        });
    }
  }

  ngOnInit() {
    this.loadCart();
    // Subscribe for scanner events
    this.scannerSubscription = this.scannerService.scanner_event.subscribe(code => {
      this.manageScannerUpl(code);
    });
  }

  ngOnDestroy() {
    // Unsubscribe from scanner service
    // when this component is destroyed.
    if (this.scannerSubscription) {
      this.scannerSubscription.unsubscribe();
    }
  }

  // ngAfterViewInit() {
  //   this.searchInputFocus();
  // }

  // @HostListener('document:keydown.f7', ['$event'])
  // demoUsb(event: Event) {
  //   event.preventDefault();
  //   navigator.usb.requestDevice({ filters: [{ vendorId: 0x2341 }] })
  //     .then(device => {
  //       console.log(device.productName);      // "Arduino Micro"
  //       console.log(device.manufacturerName); // "Arduino LLC"
  //     })
  //     .catch(error => { console.log(error); });
  // }

  // @HostListener('document:keydown.f6', ['$event'])
  // cartModeSwitch(event?: Event) {
  //   if (event) {
  //     event.preventDefault();
  //   }
  //   this.isToggleOn = this.isToggleOn ? false : true;
  //   this.searchInputFocus();
  // }

  // @ViewChild('searchInput') searchInput: ElementRef;
  // @HostListener('document:keydown.f1', ['$event'])
  // searchInputFocus(event?: Event) {
  //   if (event) {
  //     event.preventDefault();
  //   }
  //   this.clearSearch();
  //   setTimeout(() => {
  //     this.searchInput.nativeElement.focus();
  //   }, 0);
  // }

  // @ViewChild('cartList') cartList: ModalComponent;
  // @HostListener('document:keydown.f3', ['$event'])
  // displayCarts(event?: Event) {
  //   if (event) {
  //     event.preventDefault();
  //   }
  //   this.cartList.open();
  // }

  // @HostListener('document:keydown.f5', ['$event'])
  // closeCart(event?: Event) {
  //   if (event) {
  //     event.preventDefault();
  //   }
  //   alert('Kosár lezárása');
  // }

  // @ViewChild('keyboardShortcuts') keyboardShortcuts: ModalComponent;
  // @HostListener('document:keydown.f9', ['$event'])
  // displayShortcuts(event?: Event) {
  //   if (event) {
  //     event.preventDefault();
  //   }
  //   this.keyboardShortcuts.open();
  // }

  // Check if there is any input field, that has focus
  // checkDocumentHasAnyFocus(): boolean {
  //   let hasAnyFocus: boolean = false;
  //   let list = document.getElementsByTagName("input");
  //   for (var i = 0; i < list.length; i++) {
  //     if (list[i] === document.activeElement) {
  //       hasAnyFocus = true;
  //     }
  //   }
  //   return hasAnyFocus;
  // }
}