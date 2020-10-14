import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Output() filter: EventEmitter<string> = new EventEmitter();

  constructor() { }

  filterString: string = '';
  appliedFilter: boolean = false;

  applyFilter() {
    this.filter.emit(this.filterString);
    this.appliedFilter = true;
  }

  removeFilter() {
    this.filter.emit('');
    this.appliedFilter = false;
    this.filterString = '';
  }

  ngOnInit(): void {
  }

}
