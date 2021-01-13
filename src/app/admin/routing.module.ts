import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from '../guard/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { EmptyComponent } from '../layout/empty/empty.component';
import { UserComponent } from './user/user.component';
import { UserNewComponent } from './user/user-new/user-new.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerNewComponent } from './customer/new/customer-new.component';
import { CustomerDetailComponent } from './customer/details/customer-detail.component';
import { PosComponent } from './pos/pos.component';
import { StockComponent } from './stock/stock.component';
import { SourceComponent } from './source/source.component';
import { ProductComponent } from './product/product.component';
import { HelloComponent } from './partial/hello/hello.component';
import { ProductNewComponent } from './product/new/product-new.component';
import { ProductDetailsComponent } from './product/details/product-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CashComponent } from './cash/cash.component';
import { ProcurementComponent } from './procurement/procurement.component';

const routes: Routes = [
  {
    path: 'pos', component: LayoutComponent, canActivateChild: [AuthGuard], children: [
      { path: '', component: PosComponent, data: { title: "POS" } }
    ],
  },
  {
    path: 'product', component: LayoutComponent, canActivateChild: [AuthGuard], children: [
      { path: '', component: ProductComponent, data: { title: "Termékek" } },
      { path: 'new', component: ProductNewComponent },
      { path: ':sku', component: ProductDetailsComponent }
    ]
  },
  {
    path: '', component: LayoutComponent, canActivateChild: [AuthGuard], children: [
      {
        path: '', component: DashboardComponent,
      },
      {
        path: 'cash', component: CashComponent
      },
      {
        path: 'hello', component: HelloComponent
      },
      { path: 'stock', component: StockComponent, data: { title: 'Raktár', breadcrumb: 'Raktár' } },
      {
        path: 'source', component: SourceComponent
      },
      {
        path: 'procurement', component: ProcurementComponent
      },
      {
        path: 'customer', children: [
          { path: '', component: CustomerComponent },
          { path: 'new', component: CustomerNewComponent },
          { path: ':customer_id', component: CustomerDetailComponent }
        ]
      },
      { path: 'profile', component: ProfileComponent, data: { breadcrumb: 'Felhasználói profil' } },
      // { path: 'pos', component: PosComponent, data: { breadcrumb: 'POS' } },
      {
        path: 'user', component: EmptyComponent, children: [
          { path: '', component: UserComponent },
          { path: 'new', component: UserNewComponent },
          { path: ':user_id', component: UserDetailComponent }
        ]
      },
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
