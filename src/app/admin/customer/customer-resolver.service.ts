import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take, map, delay } from 'rxjs/operators';
import { Customer, CustomerService } from '../../services/customer/customer.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerListResolverService implements Resolve<{ ids: number[], customers: Customer[] }> {
  constructor(private customer_service: CustomerService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ ids: number[], customers: Customer[] }> | Observable<never> {
    const customer_id = route.paramMap.get('id');

    return this.customer_service.get_all().pipe(
      mergeMap(res => {
        let ids: number[] = [];
        ids = res;
        return this.customer_service
          .get_bulk(ids.slice(
            0, 15)).pipe(
              map(res => {
                return { ids: ids, customers: res };
              })
            );
      })
    );
  }
}