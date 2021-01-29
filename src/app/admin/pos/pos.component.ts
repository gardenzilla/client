import { Component, OnInit, HostListener, ViewChild, ElementRef, ComponentRef, ViewChildren, Host } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ModalComponent } from '../partial/modal/modal.component';
import { CartInfoObj, CartObj, CartService } from 'src/app/services/cart.service';
import { Profile } from 'src/app/services/profile/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private cartService: CartService,
    private userService: UserService
  ) { }

  opened_carts: CartInfoObj[] = [];
  users: Profile[] = [];

  isVoid(): boolean {
    return true;
  }
  void() { }

  createNewCart() {
    if (!confirm('Biztosan?')) {
      return false;
    }
    this.cartService.new().subscribe(res => {
      this.openCart(res.id);
    });
  }

  openCart(id: string) {
    this.router.navigateByUrl(`/pos/${id}`);
  }

  loadUsers() {
    this.userService.get_all().subscribe(res => {
      res.forEach(user => this.users[user.uid] = user);
    });
  }

  ngOnInit() {
    // Load users
    this.loadUsers();
    // Load opened carts
    this.cartService.get_all().subscribe(res => {
      this.cartService.get_bulk_info(res).subscribe(res => {
        this.opened_carts = res;
      });
    });
    // this.cartService.new().subscribe(res => {
    //   console.log(res);
    //   this.cartService.get_all().subscribe(res => {
    //     this.cartService.get_bulk_info(res).subscribe(res => {
    //       console.log(res);
    //     });
    //   });
    // });
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