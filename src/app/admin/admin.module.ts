import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';

import { RoutingModule as AdminRouter } from './routing.module';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './partial/navbar/navbar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { ButtonSubmitComponent } from './partial/button-submit/button-submit.component';
import { ErrorDisplayComponent } from './partial/error-display/error-display.component';
import { UserComponent } from './user/user.component';
import { UserNewComponent } from './user/user-new/user-new.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { RepositoryComponent } from './repository/repository.component';
import { RepositoryDetailComponent } from './repository/repository-detail/repository-detail.component';
import { RepositoryLayoutComponent } from './layout/repository-layout/repository-layout.component';
import { LedgerComponent } from './ledger/ledger.component';
import { SummaryComponent } from './summary/summary.component';
import { TransactionComponent } from './transaction/transaction.component';
import { AssetComponent } from './asset/asset.component';
import { ProjectComponent } from './project/project.component';
import { AccountComponent } from './account/account.component';
import { SettingComponent } from './setting/setting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountDetailComponent } from './account/account-detail/account-detail.component';
import { AccountNewComponent } from './account/account-new/account-new.component';
import { RepositoryNewComponent } from './repository/repository-new/repository-new.component';
import { AssetDetailComponent } from './asset/asset-detail/asset-detail.component';
import { AssetNewComponent } from './asset/asset-new/asset-new.component';
import { TransactionNewComponent } from './transaction/transaction-new/transaction-new.component';
import { TransactionDetailComponent } from './transaction/transaction-detail/transaction-detail.component';
import { ProjectNewComponent } from './project/project-new/project-new.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { CustomerComponent } from './customer/customer.component';
import { PosComponent } from './pos/pos.component';
import { PosLayoutComponent } from './layout/pos-layout/pos-layout.component';
import { PagernavComponent } from './partial/pagernav/pagernav.component';
import { StockComponent } from './stock/stock.component';
import { ModalComponent } from './partial/modal/modal.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    LayoutComponent,
    PosLayoutComponent,
    PagernavComponent,
    NavbarComponent,
    ProfileComponent,
    ButtonSubmitComponent,
    ModalComponent,
    ErrorDisplayComponent,
    UserComponent,
    UserNewComponent,
    UserDetailComponent,
    RepositoryComponent,
    RepositoryDetailComponent,
    RepositoryLayoutComponent,
    LedgerComponent,
    SummaryComponent,
    TransactionComponent,
    AssetComponent,
    ProjectComponent,
    ProductComponent,
    AccountComponent,
    SettingComponent,
    DashboardComponent,
    AccountDetailComponent,
    AccountNewComponent,
    RepositoryNewComponent,
    AssetDetailComponent,
    AssetNewComponent,
    TransactionNewComponent,
    TransactionDetailComponent,
    ProjectNewComponent,
    ProjectDetailComponent,
    CustomerComponent,
    PosComponent,
    StockComponent
  ],
  imports: [
    ChartsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRouter,
  ]
})
export class AdminModule { }
