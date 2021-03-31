import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';
import { DataTablesModule } from "angular-datatables";

import { RoutingModule as AdminRouter } from './routing.module';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './partial/navbar/navbar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { ButtonSubmitComponent } from './partial/button-submit/button-submit.component';
import { UserComponent } from './user/user.component';
import { UserNewComponent } from './user/user-new/user-new.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerNewComponent } from './customer/new/customer-new.component';
import { CustomerDetailComponent } from './customer/details/customer-detail.component';
import { PosComponent } from './pos/pos.component';
import { PosDetailsComponent } from './pos/pos-details.component';
import { PosUplEditComponent } from './pos/pos-upledit.component';
import { PaginationComponent } from './partial/pagination/pagination.component';
import { StockComponent } from './stock/stock.component';
import { ProcurementComponent } from './procurement/procurement.component';
import { ProcurementDetailsComponent } from './procurement/details/procurement-details.component';
import { SourceComponent } from './source/source.component';
import { ModalComponent } from './partial/modal/modal.component';
import { ProductComponent } from './product/product.component';
import { UplComponent } from './upl/upl.component';
import { HelloComponent } from './partial/hello/hello.component';
import { ErrorComponent } from './partial/error/error.component';
import { SnackBarComponent } from './partial/snack-bar/snack-bar.component';
import { TableComponent } from './partial/table/table.component';
import { FilterComponent } from './partial/filter/filter.component';
import { ProductNewComponent } from './product/new/product-new.component';
import { ProductDetailsComponent } from './product/details/product-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CashComponent } from './cash/cash.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { GzDatePipe } from '../pipes/gz-date.pipe';
import { GzDateTimePipe } from '../pipes/gz-datetime.pipe';
import { GzHufPipe } from '../pipes/gz-huf.pipe';
import { GzUserPipe } from '../pipes/gz-user.pipe';
import { GzNumberPipe } from '../pipes/gz-number.pipe';
import { PdetailsLinfoComponent } from './product/details/pdetails-linfo/pdetails-linfo.component';
import { PosSearchComponent } from './pos/pos-search/pos-search.component';
import { PosPaymentComponent } from './pos/pos-payment/pos-payment.component';
import { PosSplitComponent } from './pos/pos-split/pos-split.component';
import { PosUplinfoComponent } from './pos/pos-uplinfo/pos-uplinfo.component';
import { ButtonTestComponent } from './partial/button-test/button-test.component';
import { CommitmentComponent } from './commitment/commitment.component';

@NgModule({
  declarations: [
    LayoutComponent,
    PaginationComponent,
    NavbarComponent,
    ProfileComponent,
    ButtonSubmitComponent,
    ModalComponent,
    UserComponent,
    UserNewComponent,
    UserDetailComponent,
    ProductComponent,
    CustomerComponent,
    PosComponent,
    PosDetailsComponent,
    PosUplEditComponent,
    StockComponent,
    ProcurementComponent,
    ProcurementDetailsComponent,
    HelloComponent,
    ErrorComponent,
    CustomerNewComponent,
    CustomerDetailComponent,
    SnackBarComponent,
    TableComponent,
    FilterComponent,
    ProductNewComponent,
    ProductDetailsComponent,
    DashboardComponent,
    CashComponent,
    PurchaseComponent,
    SourceComponent,
    UplComponent,
    CommitmentComponent,
    GzDatePipe,
    GzDateTimePipe,
    GzHufPipe,
    GzUserPipe,
    GzNumberPipe,
    PdetailsLinfoComponent,
    PosSearchComponent,
    PosPaymentComponent,
    PosSplitComponent,
    PosUplinfoComponent,
    ButtonTestComponent,
  ],
  imports: [
    ChartsModule,
    DataTablesModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRouter,
  ]
})
export class AdminModule { }
