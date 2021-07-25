import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class CashregisterBridgeService implements OnDestroy {
  // Cashregister bridge websocket stored here
  private cashregister_bridge: WebSocketSubject<any>;
  // Cashregister bridge ws subscription stored here
  private subscription: Subscription;

  constructor() {
    // Websoecket connection
    this.cashregister_bridge = webSocket({
      url: 'ws://127.0.0.1:2796',
      protocol: 'cashregisterbridge'
    });
    // Subscripe to WP
    this.subscription = this.cashregister_bridge.asObservable().subscribe(
      // If there is any event from the scanner
      // send it to the subscribers
      res => {
        // send each code to subscriber
        // this.scanner_event.next(this.processUplUrl(res.code));
      },
      // If there is an error from the scanner bridge
      // such as no bridge available;
      // close the connection, unsubscribe and log it
      err => {
        console.log("No cashregister_bridge found, cashregister sync is disabled.\nPlease install cashregister_bridge from https://github.com/gardenzilla/cashregister_bridge");
        // Close opened but failed socket
        this.cashregister_bridge.complete();
        // Unsubscibe the socket subscription
        if (this.subscription) {
          this.subscription.unsubscribe();
        }
      });
  }

  print_receipt(total_price: number, is_kind_cash: boolean) {
    // Check if there is an active cashregister_bridge connection
    if (this.cashregister_bridge) {
      this.cashregister_bridge.next({total_price: total_price, payment_kind: is_kind_cash ? "Cash" : "Card"});
    }
  }

  ngOnDestroy() {
    // Unsubscribe websocket subscription when
    // this service is destroyed.
    this.subscription.unsubscribe();
  }
}
