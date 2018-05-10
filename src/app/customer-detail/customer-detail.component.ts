import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

import { Customer }         from '../customer';
import { CustomerService }  from '../customer.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: [ './customer-detail.component.css' ]
})

export class CustomerDetailComponent implements OnInit {
  urlmap: any;
  customer: any;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private location: Location,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
      this.getCustomer();
  }

  getCustomer(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.customerService.getCustomer(id).subscribe(customer=>{
      console.log(customer);
      this.urlmap=this.sanitizer.bypassSecurityTrustResourceUrl('https://maps.google.com/maps?q='+customer.lat+','+customer.lng+'&hl=es;z=14&amp;&output=embed')
      this.customer = customer;
    });
  }

  goBack(): void {
    this.location.back();
  }
}