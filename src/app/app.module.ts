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
import { ProfileService } from './services/profile/profile.service';
import { ErrorService } from './services/error/error.service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    PasswordresetComponent,
    EmptyComponent,
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
    ProfileService,
    ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
