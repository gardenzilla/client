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
  _pageSize: number;
  dataCount: number;

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

  _resizePage() {
    this._controller.setPageSize(this._pageSize);
  }

  subscribePagination(): Subscription {
    return this._controller.paginationObject$.subscribe(controller => {
      this.pageCount = controller.pageCount;
      this.currentPage = controller.currentPage;
      this.previousPage = controller.previousPage;
      this.nextPage = controller.nextPage;
      this.pageSize = controller.pageSize;
      this._pageSize = controller.pageSize;
      this.dataCount = controller.dataCount;
      this.fillPages();
      if (this.handleUrl) {
        if (this.currentPage != this._queryParamPage) {
          this.setQueryParams(this.currentPage);
        }
      }
    });
  }

  setQueryParams(to: number) {
    this.router.navigate([], { queryParams: { page: to }, queryParamsHandling: 'merge' });
  }

  goto(to: number) {
    if (this.handleUrl) {
      this.setQueryParams(to);
    } else {
      this._controller.navigateTo(to, this.pageSize);
    }
  }

  ngOnInit(): void {
    this._queryParamSubscription = this.route.queryParams.subscribe(params => {
      let gotoPage: number = 1;
      if (params.page) {
        let tryint = parseInt(params.page);
        gotoPage = tryint != NaN ? tryint : 1;
      }
      let _pageSize: number = this.pageSize;
      if (params.size) {
        let sizeint = parseInt(params.size);
        if (sizeint != NaN) {
          _pageSize = sizeint;
        }
      }
      this._queryParamPage = gotoPage;
      if (this.handleUrl) {
        if (this.currentPage != this._queryParamPage || this.pageSize != _pageSize) {
          setTimeout(() => {
            this._controller.navigateTo(this._queryParamPage, _pageSize);
          });
        }
        // if (this.pageSize != _pageSize) {
        //   setTimeout(() => {
        //     this.pageSize = _pageSize;
        //     this.resizePage();
        //   });
        // }
      }
    });
    setTimeout(() => { this._controller.render(); });
  }
}