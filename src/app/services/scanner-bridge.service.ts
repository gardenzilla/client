import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class ScannerBridgeService implements OnDestroy {
  // Scanner Event subject
  // Clients can subscribe to it
  // to get scanner event as scanned and processed code
  public scanner_event: Subject<string> = new Subject();
  // Scanner bridge websocket stored here
  private scanner_bridge: WebSocketSubject<any>;
  // Scanner bridge ws subscription stored here
  private subscription: Subscription;

  constructor() {
    // Websoecket connection
    this.scanner_bridge = webSocket({
      url: 'ws://127.0.0.1:2794',
      protocol: 'scannerbridge'
    });
    // Subscripe to WP
    this.subscription = this.scanner_bridge.asObservable().subscribe(
      // If there is any event from the scanner
      // send it to the subscribers
      res => {
        // send each code to subscriber
        this.scanner_event.next(this.processUplUrl(res.code));
      },
      // If there is an error from the scanner bridge
      // such as no bridge available;
      // close the connection, unsubscribe and log it
      err => {
        console.log("No scanner_bridge found, scanner sync is disabled.\nPlease install scanner_bridge from https://github.com/gardenzilla/scanner_bridge");
        // Close opened but failed socket
        this.scanner_bridge.complete();
        // Unsubscibe the socket subscription
        if (this.subscription) {
          this.subscription.unsubscribe();
        }
      });
  }

  sendError() {
    // Check if there is an active scanner_bridge connection
    if (this.scanner_bridge) {
      this.scanner_bridge.next("error");
    }
  }

  private processUplUrl(query: string): string {
    // Check wether query is a UPL QR code
    // with the following scheme:
    // https://gardenzilla.hu/uinfo/<UPL_ID>
    // where <UPL_ID> is the needed UPL ID
    if (query.includes("/uinfo/")) {
      let parts: string[] = query.split('/');
      if (parts[parts.length - 2] == 'uinfo') {
        return parts[parts.length - 1];
      }
    }
    // If there is no successful preprocess result
    // then return the original query
    return query;
  }

  ngOnDestroy() {
    // Unsubscribe websocket subscription when
    // this service is destroyed.
    this.subscription.unsubscribe();
  }
}
