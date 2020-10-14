import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input()
  get dataSource(): any[] { return this._dataSource; }
  set dataSource(s: any[]) { this._dataSource = s; this.render(); }

  @Input()
  set filter(f: (_f: any) => boolean) { this._filter = f; this.render(); }
  get filter(): (f: any) => boolean { return this._filter; }

  display: any[];
  private _dataSource: any[];
  private _filter: (f: any) => boolean;

  render() {
    if (this.filter) {
      this.display = this._dataSource.filter((c) => this._filter(c));
    } else {
      this.display = this._dataSource;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
