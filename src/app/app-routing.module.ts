import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { CustomerComponent }      from './customers/customers.component';
import { LoginComponent }   from './login/login.component';
import { CustomerDetailComponent }  from './customer-detail/customer-detail.component';
import { NewcustomerComponent } from './newcustomer/newcustomer.component';

const routes: Routes = [
  { path: '', redirectTo: localStorage.getItem('currentUser')?'/customers':'/login', pathMatch: 'full' },
  { path: 'detail/:id', component: CustomerDetailComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'newcustomer', component: NewcustomerComponent }
];


export const routing = RouterModule.forRoot(routes);

