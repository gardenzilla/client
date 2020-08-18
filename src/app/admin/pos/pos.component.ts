import { Component, OnInit, HostListener, ViewChild, ElementRef, ComponentRef, ViewChildren, Host } from '@angular/core';
import { Pager } from 'src/app/class/pager';
import { Profile } from 'src/app/class/profile';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable, from, interval, of, BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModalComponent } from '../partial/modal/modal.component';
import { ElementSchemaRegistry, NullTemplateVisitor } from '@angular/compiler';

@Component({
  selector: 'app-user',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private title: Title) { }
  ngOnInit() { }

  ngAfterViewInit() {
    this.searchInputFocus();
  }

  search: string = '';
  life: number = 42;
  isSearchUser: boolean = false;

  egCustomers: Pager<any> = new Pager([
    { name: 'Example 1', address: '4522 Nyírtass, Alkotmány út 55.', taxnumber: '2346543-1-23' },
    { name: 'Example 2', address: '4522 Nyírtass, Alkotmány út 55.', taxnumber: '2346543-1-23' },
    { name: 'Example 3', address: '4522 Nyírtass, Alkotmány út 55.', taxnumber: '2346543-1-23' },
    { name: 'Example 4', address: '4522 Nyírtass, Alkotmány út 55.', taxnumber: '2346543-1-23' },
    { name: 'Example 5', address: '4522 Nyírtass, Alkotmány út 55.', taxnumber: '2346543-1-23' },
    { name: 'Example 6', address: '4522 Nyírtass, Alkotmány út 55.', taxnumber: '2346543-1-23' },
    { name: 'Example 7', address: '4522 Nyírtass, Alkotmány út 55.', taxnumber: '2346543-1-23' },
    { name: 'Example 8', address: '4522 Nyírtass, Alkotmány út 55.', taxnumber: '2346543-1-23' },
    { name: 'Example 9', address: '4522 Nyírtass, Alkotmány út 55.', taxnumber: '2346543-1-23' },
    { name: 'Example 10', address: '4522 Nyírtass, Alkotmány út 55.', taxnumber: '2346543-1-23' },
    { name: 'Example 11', address: '4522 Nyírtass, Alkotmány út 55.', taxnumber: '2346543-1-23' },
    { name: 'Example 12', address: '4522 Nyírtass, Alkotmány út 55.', taxnumber: '2346543-1-23' },
    { name: 'Example 13', address: '4522 Nyírtass, Alkotmány út 55.', taxnumber: '2346543-1-23' },
    { name: 'Example 14', address: '4522 Nyírtass, Alkotmány út 55.', taxnumber: '2346543-1-23' },
    { name: 'Example 15', address: '4522 Nyírtass, Alkotmány út 55.', taxnumber: '2346543-1-23' },
    { name: 'Example 16', address: '4522 Nyírtass, Alkotmány út 55.', taxnumber: '2346543-1-23' },
    { name: 'Example 17', address: '4522 Nyírtass, Alkotmány út 55.', taxnumber: '2346543-1-23' },
    { name: 'Example 18', address: '4522 Nyírtass, Alkotmány út 55.', taxnumber: '2346543-1-23' },
    { name: 'Example 19', address: '4522 Nyírtass, Alkotmány út 55.', taxnumber: '2346543-1-23' },
  ]);

  egProducts: Pager<any> = new Pager([
    { name: 'Bordóilé neo SC', quantity: 250, unit: 'ml', net_retail_price: 3900.0, stock_ok: 3, stock_injured: 1, stock_global: 0 },
    { name: 'Bordóilé neo SC', quantity: 1, unit: 'l', net_retail_price: 1500.12, stock_ok: 24, stock_injured: 0, stock_global: 0 },
    { name: 'Bordóilé neo SC', quantity: 5, unit: 'l', net_retail_price: 9500.0, stock_ok: 0, stock_injured: 1, stock_global: 0 },
    { name: 'Bordóilé neo SC', quantity: 20, unit: 'l', net_retail_price: 32900.0, stock_ok: 0, stock_injured: 1, stock_global: 5 },
    { name: 'Gardena kerti locsoló + tömlő', quantity: 25, unit: 'm', net_retail_price: 11700.27, stock_ok: 1, stock_injured: 0, stock_global: 0 },
  ]);

  egUpls: any[] = [
    { id: 1231234, sku_name: 'Kerti lombseprű', quantity: 1, unit: 'kg', gross_retail_price: 7900.12, best_before: '2022-04-15' },
    { id: 1231234, sku_name: 'Kerti lombseprű', quantity: 1, unit: 'kg', gross_retail_price: 7900.12, best_before: '2022-04-15' },
    { id: 1231234, sku_name: 'Kerti lombseprű', quantity: 1, unit: 'kg', gross_retail_price: 7900.12, best_before: '2022-04-15' },
    { id: 1231234, sku_name: 'Kerti lombseprű', quantity: 1, unit: 'kg', gross_retail_price: 7900.12, best_before: '2022-04-15' },
    { id: 1231234, sku_name: 'Kerti lombseprű', quantity: 1, unit: 'kg', gross_retail_price: 7900.12, best_before: '2022-04-15' },
    { id: 1231234, sku_name: 'Kerti lombseprű', quantity: 1, unit: 'kg', gross_retail_price: 7900.12, best_before: '2022-04-15' },
    { id: 1231234, sku_name: 'Kerti lombseprű', quantity: 1, unit: 'kg', gross_retail_price: 7900.12, best_before: '2022-04-15' },
    { id: 1231234, sku_name: 'Kerti lombseprű', quantity: 1, unit: 'kg', gross_retail_price: 7900.12, best_before: '2022-04-15' },
    { id: 1231234, sku_name: 'Kerti lombseprű', quantity: 1, unit: 'kg', gross_retail_price: 7900.12, best_before: '2022-04-15' }
  ];

  isToggleOn: boolean = false;

  message(msg: string) {
    alert(msg);
  }

  clearUpls() {
    confirm("Biztosan eltávolítasz minden UPL-t?");
  }

  searchEnter(event) {
    let query = event.target.value;
    // Check if customer search
    if (this.isSearchUser) {
      console.log("User search " + query);
    } else {
      // Check if there is upl
      let upl = this.processUpl(query);
      if (upl) {
        if (!this.isToggleOn) {
          console.log('UPL IN ' + upl.toString());
        } else {
          console.log('UPL OUT ', upl.toString());
        }
        this.search = upl.toString();
      } else {
        console.log('SKU search ' + query);
      }
    }
  }

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

  @HostListener('document:keydown.f6', ['$event'])
  cartModeSwitch(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.isToggleOn = this.isToggleOn ? false : true;
    this.searchInputFocus();
  }

  checkSearchType() {
    if (this.search.charAt(0) == '@') {
      this.isSearchUser = true;
    } else {
      this.isSearchUser = false;
    }
  }

  @ViewChild('searchInput') searchInput: ElementRef;
  @HostListener('document:keydown.f1', ['$event'])
  searchInputFocus(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.clearSearch();
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
    }, 0);
  }

  @ViewChild('cartList') cartList: ModalComponent;
  @HostListener('document:keydown.f3', ['$event'])
  displayCarts(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.cartList.open();
  }

  @HostListener('document:keydown.f5', ['$event'])
  closeCart(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    alert('Kosár lezárása');
  }

  @ViewChild('keyboardShortcuts') keyboardShortcuts: ModalComponent;
  @HostListener('document:keydown.f9', ['$event'])
  displayShortcuts(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.keyboardShortcuts.open();
  }

  // Check if there is any input field, that has focus
  checkDocumentHasAnyFocus(): boolean {
    let hasAnyFocus: boolean = false;
    let list = document.getElementsByTagName("input");
    for (var i = 0; i < list.length; i++) {
      if (list[i] === document.activeElement) {
        hasAnyFocus = true;
      }
    }
    return hasAnyFocus;
  }

  processUpl(query: string): number {
    let parts: string[] = query.split('/');
    if (parts[parts.length - 2] == 'upl') {
      return +parts[parts.length - 1];
    }
    return null;
  }

  openNewCart() {
    confirm("Biztosan új kosarat nyitsz?");
  }

  clearSearch() {
    this.search = '';
  }

  demo = () => {
    alert('Search is ' + this.search);
  }
}