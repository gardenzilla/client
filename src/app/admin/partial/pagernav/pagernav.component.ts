import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Pager } from 'src/app/class/pager';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pagernav',
  templateUrl: './pagernav.component.html',
  styleUrls: ['./pagernav.component.scss'],
})
export class PagernavComponent implements OnInit {

  @Input() data: Pager<any>;
  @Input() offline?: boolean = false;
  @Input() count?: number = 10;
  @Input() isCompact?: boolean = false;
  @Input() isSmall?: boolean = false;
  routeSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // Ok I do not understand exactly,
    // but I used this approach:
    // https://dev.to/imsabodetocode/error-expressionchangedafterithasbeencheckederror-expression-has-changed-after-it-was-checked-53gn
    // todo: Why does it work?
    setTimeout(() => {
      this.routeSubscription = this.route.queryParams.subscribe(params => {
        let goto: number = 1;
        if (params.page) {
          let tryint = parseInt(params.page);
          goto = tryint != NaN ? tryint : 1;
        }
        this.data.page_size = this.count;
        this.data.navigate_to(goto);
      });
    }, 0);
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
