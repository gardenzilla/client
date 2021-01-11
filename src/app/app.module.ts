import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminModule } from './admin/admin.module';
import { DataService } from './services/data/data.service';
import { LoginService } from './services/login/login.service';
import { LoginComponent } from './login/login/login.component';
import { EmptyComponent } from './layout/empty/empty.component';
import { PasswordresetComponent } from './login/passwordreset/passwordreset.component';
import { httpInterceptorProviders } from './interceptors';
import { RouterParamService } from './services/router-param/router-param.service';
import { ModalService } from './services/modal/modal.service';
import { CustomerService } from './services/customer/customer.service';
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';
import { SkuService } from './services/sku.service';
import { PriceService } from './services/price.service';
import { ProfileService } from './services/profile/profile.service';
import { ErrorService } from './services/error/error.service';
import { AutofocusDirective } from './autofocus.directive';
import { SnackBarService } from './services/snack-bar/snack-bar.service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    PasswordresetComponent,
    EmptyComponent,
    AutofocusDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AdminModule,
    AppRoutingModule,
  ],
  providers: [
    DataService,
    LoginService,
    RouterParamService,
    httpInterceptorProviders,
    ModalService,
    CustomerService,
    UserService,
    ProductService,
    SkuService,
    PriceService,
    ProfileService,
    ErrorService,
    SnackBarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
