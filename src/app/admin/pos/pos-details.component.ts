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
import { LocationInfo, Upl, UplKind, UplService } from 'src/app/services/upl.service';
import { Product, ProductService } from 'src/app/services/product.service';

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
  scannerSubscription2: Subscription;

  model_sku_edit: ItemObj | null = null;

  edit_sku: number | null = null;

  upl_id_to_divide: string = "";
  upl_to_divide: Upl | null = null;

  payment_mode_quick: boolean = true;

  sku_location_info: Map<number, LocationInfo> = new Map();

  unique_upl: UplInfoObj | null = null;

  // To display UPLs in detailed
  sku_for_upl_info: number | null = null;
  upl_list_filter: string[] | null = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private cartService: CartService,
    private skuService: SkuService,
    private productService: ProductService,
    private scannerService: ScannerBridgeService,
    private priceService: PriceService,
    private customerService: CustomerService,
    private uplService: UplService,
  ) { }

  openUplList(sku: number, display_filter: string[]) {
    this.sku_for_upl_info = null;
    this.upl_list_filter = display_filter;
    this.sku_for_upl_info = sku;
  }

  closeUplList() {
    this.sku_for_upl_info = null;
  }

  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('searchModal') searchModal: ModalComponent;
  @HostListener('document:keydown.f2', ['$event'])
  displaySearch(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.searchModal.open();
    setTimeout(() => {
      this.searchInput.nativeElement.select();
      this.searchInput.nativeElement.focus();
    });
  }

  setEditSku(sku: number) {
    this.edit_sku = sku;
    this.loadEditSku();
  }

  @ViewChild('payment_amount') payment_amount: ElementRef;
  @ViewChild('modalClose') modalClose: ModalComponent;
  @HostListener('document:keydown.f5', ['$event'])
  OpenCloseForm() {
    if (event) {
      event.preventDefault();
    }
    this.modalClose.open();
    setTimeout(() => {
      this.payment_amount.nativeElement.select();
      this.payment_amount.nativeElement.focus();
    }, 0);
  }

  cartSetPayment(to: string) {
    this.cartService.set_payment(this.cart_id, to).subscribe(
      res => this.cart = res
    );
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

  @ViewChild('modalUniqueUpl') modalUniqueUpl: ModalComponent;
  openUniqueUpl(upl_info_object: UplInfoObj) {
    this.modalUniqueUpl.open();
    this.unique_upl = null;
    this.unique_upl = upl_info_object;
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
        this.uplService.get_location_info_bulk(sku_ids).subscribe(
          res => res.forEach(location_info => this.sku_location_info[location_info.sku] = location_info)
        );
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
    this.searchModal.close();
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
      // First load UPL and check if its a single UPL or Derived Product
      this.uplService.get_by_id(code).subscribe(
        upl => {
          if (upl) {
            if (upl.upl_kind == UplKind.Sku || upl.upl_kind == UplKind.DerivedProduct) {
              this.cartService.add_upl(this.cart_id, code).subscribe(
                res => {
                  this.searchModal.close();
                  this.cart = res;
                },
                err => {
                  console.log(err);
                  this.scannerService.sendError();
                }
              );
            } else {
              // Set UPL to divide or split
              this.openDivide(upl)
            }
          } else {
            this.scannerService.sendError();
          }
        }
      );
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

  loadUplToDivide() {
    this.uplService.get_by_id(this.upl_id_to_divide).subscribe(
      res => this.upl_to_divide = res,
      err => this.scannerService.sendError()
    );
  }

  @ViewChild('modalDivide') modalDivide: ModalComponent;
  openDivide(upl: Upl) {
    // Reset UPL model
    this.upl_to_divide = upl;
    // Unsubscribe main scanner event listener
    this.scannerUnsubscribe();
  }

  closeDivide() {
    this.upl_to_divide = null;
    // Subscribe main scanner event listener
    this.scannerSubscribe();
  }

  scannerSubscribe() {
    // Subscribe for scanner events
    this.scannerSubscription = this.scannerService.scanner_event.subscribe(code => {
      this.manageScannerUpl(code);
    });
  }

  scannerUnsubscribe() {
    // Unsubscribe from scanner service
    // when this component is destroyed.
    if (this.scannerSubscription) {
      this.scannerSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.loadCart();
    this.scannerSubscribe();
  }

  ngOnDestroy() {
    this.scannerUnsubscribe();
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

export class UplToDivide {
  constructor(
    public upl: Upl,
    public product: Product | null = null,
    public sku: Sku | null = null,
    public price: Price | null = null,
  ) { }
}