import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {URLSearchParams} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AlertService, AuthenticationService, LoggedInService} from '../_services/index';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
    moduleId: module.id,
    templateUrl: 'newcustomer.component.html'
})

export class NewcustomerComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private loggedInService: LoggedInService,
        private http: HttpClient) { }

    ngOnInit() {

    }

    newcustomer(){

        const url = `/s/newcustomer/?firstname=${this.model.firstname}&lastname=${this.model.lastname}&email=${this.model.email}&city=${this.model.city}&address=${this.model.address}`;
        console.log(url);
        return this.http.get<any>(url).map(resp => {

               return resp;

           }
               )
        .subscribe(
                data => {
                    console.log(data.msg);
                    this.router.navigate(['/customers']);
                    this.alertService.success(data.msg);
                },
                err => {
                    console.log(err)
                    this.alertService.error(err.error);
                });

 

            }

    }