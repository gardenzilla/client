import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartObj } from 'src/app/services/cart.service';

@Component({
  selector: 'app-pos-payment',
  templateUrl: './pos-payment.component.html',
  styleUrls: ['./pos-payment.component.css']
})
export class PosPaymentComponent implements OnInit {

  @Input() cart: CartObj;
  @Output() set_payment_method: EventEmitter<string> = new EventEmitter();
  @Output() add_payment: EventEmitter<{ kind: string, amount: number }> = new EventEmitter();
  @Output() close_cart: EventEmitter<void> = new EventEmitter();

  constructor() { }

  payment_modal: number = 0;
  payment_method_model: string = "Cash";
  payment_mode_quick: boolean = true;

  ngOnInit(): void {
  }

  cartSetPayment(kind: string) {
    this.set_payment_method.emit(kind);
  }

  addPayment(kind: string, amount: number) {
    this.add_payment.emit({ kind: kind, amount: amount });
  }

  closeCart() {
    this.close_cart.emit();
  }
}
