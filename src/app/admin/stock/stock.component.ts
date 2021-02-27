import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { interval, Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, take, tap } from 'rxjs/operators';
import { NewStock, Stock, StockService } from 'src/app/services/stock.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ButtonTestComponent } from '../partial/button-test/button-test.component';

@Component({
  selector: 'app-user',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  stocks: Stock[] = [];
  model_new_stock: NewStock = new NewStock();
  model_update_stock: Stock = new Stock();

  demo_form = new FormGroup({
    'name': new FormControl(''),
    'age': new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(1),
    ]),
    'email': new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ])
  });

  get email() { return this.demo_form.get('email') }


  submit() {
    console.log(this.demo_form.value);
  }

  constructor(private stockService: StockService) { }

  setStockToUpdate(stock: Stock) {
    this.model_update_stock = Object.assign({}, stock);
  }

  callbackCreate = (): Observable<any> => {
    return this.stockService.new(this.model_new_stock).pipe(
      tap(res => {
        this.stocks.push(res);
      })
    );
  }

  callbackUpdate = (): Observable<any> => {
    return this.stockService.update_by_id(this.model_update_stock).pipe(
      tap(res => {
        // Replace stock object
        let i = this.stocks.findIndex(item => item.stock_id == this.model_update_stock.stock_id);
        this.stocks.splice(i, 1, res);
      })
    );
  }

  demoTitle$: Observable<string>;

  ngOnInit() {
    this.stockService.get_all().subscribe((res) => this.stocks = res);

    // Demo
    this.demoTitle$ = interval(1000).pipe(mergeMap(x => x < 4 ? `${x}` : throwError("too high"))).pipe(catchError(_ => of("?")));
  }

  @ViewChild('btn') btn: ButtonTestComponent;
  ngAfterViewInit() {
    this.btn.afterClicked().subscribe(res => console.log("Clicked! :)"));
  }
}