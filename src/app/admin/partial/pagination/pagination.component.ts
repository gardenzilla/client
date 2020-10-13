import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, DoCheck } from '@angular/core';
import { DataTable } from 'src/app/class/data-table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JsonpInterceptor } from '@angular/common/http';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {

  @Input()
  get data(): DataTable<any> { return this._data; };
  set data(d: DataTable<any>) {
    this._data = d;
  }
  @Output() dataChange = new EventEmitter<DataTable<any>>();
  @Input() offline?: boolean = false;
  @Input() count?: number = 10;
  @Input() isCompact?: boolean = false;
  @Input() isSmall?: boolean = false;
  routeSubscription: Subscription;

  _data: DataTable<any>;
  constructor(private route: ActivatedRoute, private cd: ChangeDetectorRef) { }

  ngOnInit() { 
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      setTimeout(() => {
        let goto: number = 1;
        if (params.page) {
          let tryint = parseInt(params.page);
          goto = tryint != NaN ? tryint : 1;
        }
        this._data.setPageSize(this.count);
        this._data.navigateTo(goto);
        this.dataChange.emit(this._data);
      });
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
