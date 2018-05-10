import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app-routing.module';
import { CustomerService }          from './customer.service';
import { AlertService, AuthenticationService, UserService, LoggedInService } from './_services/index';
import { AlertComponent } from './_directives/index';
import { HttpClientModule} from '@angular/common/http';
import { CustomerComponent } from './customers/customers.component';
import { LoginComponent } from './login/login.component';
import { NewcustomerComponent } from './newcustomer/newcustomer.component';
import { CustomerDetailComponent }  from './customer-detail/customer-detail.component';
import { FormsModule } from '@angular/forms';
import { MessageService } from './message.service';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    CustomerComponent,
    CustomerDetailComponent,
    LoginComponent,
    NewcustomerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpClientModule
  ],
  providers: [CustomerService, AlertService, AuthenticationService, UserService, LoggedInService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
