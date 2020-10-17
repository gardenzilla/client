import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductService, Product, ProductNew } from 'src/app/services/product.service';

@Component({
  selector: 'app-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  product: ProductNew = new ProductNew();

  constructor(private productService: ProductService, private router: Router) { }

  submit = (): Observable<any> => {
    return this.productService.new(this.product).pipe(
      tap((res: Product) => this.router.navigateByUrl(`/product/${res.sku}`))
    );
  };

  ngOnInit(): void {
  }

}
