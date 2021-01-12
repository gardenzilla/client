import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NewStock, Stock, StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-user',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  stocks: Stock[] = [];
  model_new_stock: NewStock = new NewStock();
  model_update_stock: Stock = new Stock();

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

  ngOnInit() {
    this.stockService.get_all().subscribe((res) => this.stocks = res);
  }
}