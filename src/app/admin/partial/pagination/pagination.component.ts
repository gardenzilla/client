import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, DoCheck } from '@angular/core';
import { DataTable } from 'src/app/class/data-table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { JsonpInterceptor } from '@angular/common/http';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {

  // @Input()
  // get data(): DataTable<any> { return this._data; };
  // set data(d: DataTable<any>) {
  //   this._data = d;
  // }
  // @Output() dataChange = new EventEmitter<DataTable<any>>();
  // @Input() offline?: boolean = false;
  // @Input() count?: number = 10;
  // @Input() isCompact?: boolean = false;
  // @Input() isSmall?: boolean = false;
  // @Input() demo: Subject<string>;
  // routeSubscription: Subscription;

  // _data: DataTable<any>;
  // constructor(private route: ActivatedRoute, private cd: ChangeDetectorRef) { }

  // ngOnInit() {
  //   this.routeSubscription = this.route.queryParams.subscribe(params => {
  //     setTimeout(() => {
  //       let goto: number = 1;
  //       if (params.page) {
  //         let tryint = parseInt(params.page);
  //         goto = tryint != NaN ? tryint : 1;
  //       }
  //       this._data.setPageSize(this.count);
  //       this._data.navigateTo(goto);
  //       this.dataChange.emit(this._data);
  //     });
  //   });
  // }

  // ngOnDestroy() {
  //   this.routeSubscription.unsubscribe();
  // }
  @Input() handleUrl?: boolean = false;
  @Input()
  get data(): DataTable<any> { return this._controller; };
  set data(d: DataTable<any>) {
    this._controller = d;
    if (this._paginationSubscription) {
      this._paginationSubscription.unsubscribe();
    }
    this._paginationSubscription = this.subscribePagination();
  };

  private _controller: DataTable<any>;
  private _paginationSubscription: Subscription;
  private _queryParamSubscription: Subscription;
  private _queryParamPage: number;

  pageCount: number;
  currentPage: number;
  previousPage: number;
  nextPage: number;
  pages: number[] = [];
  pageSize: number;

  constructor(private router: Router, private route: ActivatedRoute) {}

  fillPages() {
    let _pages: number[] = [];
    for (let index = 1; index <= this.pageCount; index++) {
      _pages.push(index);
    }
    this.pages = _pages;
  }

  resizePage() {
    this._controller.setPageSize(this.pageSize);
  }

  subscribePagination(): Subscription {
    return this._controller.paginationObject$.subscribe(controller => {
      this.pageCount = controller.pageCount;
      this.currentPage = controller.currentPage;
      this.previousPage = controller.previousPage;
      this.nextPage = controller.nextPage;
      this.pageSize = controller.pageSize;
      this.fillPages();
      if (this.handleUrl) {
        if (this.currentPage != this._queryParamPage) {
          this.setQueryParams(this.currentPage);
        }
      }
    });
  }

  setQueryParams(to: number) {
    this.router.navigate(['./'], { queryParams: { page: to }, queryParamsHandling: 'merge' });
  }

  goto(to: number) {
    if (this.handleUrl) {
      this.setQueryParams(to);
    } else {
      this._controller.navigateTo(to);
    }
  }

  ngOnInit(): void {
    this._queryParamSubscription = this.route.queryParams.subscribe(params => {
      let gotoPage: number = 1;
      if (params.page) {
        let tryint = parseInt(params.page);
        gotoPage = tryint != NaN ? tryint : 1;
      }
      this._queryParamPage = gotoPage;
      if (this.handleUrl) {
        if (this.currentPage != this._queryParamPage) {
          this._controller.navigateTo(this._queryParamPage);
        }
      }
    });
  }
}