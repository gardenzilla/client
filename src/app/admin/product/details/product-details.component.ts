import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from 'src/app/class/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  sku: string = this.route.snapshot.paramMap.get("sku");
  product: Product = <Product>{};

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {
  }

  submit = (): Observable<any> => {
    return this.productService.update_by_id(this.sku, this.product).pipe(
      tap(res => this.product = res)
    );
  };

  ngOnInit(): void {
    this.productService.get_by_id(this.sku).subscribe(res => this.product = res);
  }

}
