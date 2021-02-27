import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class PrinterBridgeService implements OnDestroy {
  // Scanner bridge websocket stored here
  private printer_bridge: WebSocketSubject<any>;
  // Scanner bridge ws subscription stored here
  private subscription: Subscription;

  constructor() {
    // Websoecket connection
    this.printer_bridge = webSocket({
      url: 'ws://127.0.0.1:2795',
      protocol: 'printerbridge'
    });
    // Subscripe to WP
    this.subscription = this.printer_bridge.asObservable().subscribe(
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
        console.log("No printer_bridge found, scanner sync is disabled.\nPlease install printer_bridge from https://github.com/gardenzilla/printer_bridge");
        // Close opened but failed socket
        this.printer_bridge.complete();
        // Unsubscibe the socket subscription
        if (this.subscription) {
          this.subscription.unsubscribe();
        }
      });
  }

  print_base64(document_base64: string) {
    // Check if there is an active printer_bridge connection
    if (this.printer_bridge) {
      this.printer_bridge.next(document_base64);
    }
  }

  ngOnDestroy() {
    // Unsubscribe websocket subscription when
    // this service is destroyed.
    this.subscription.unsubscribe();
  }
}
