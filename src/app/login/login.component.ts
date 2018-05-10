import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService, LoggedInService} from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private loggedInService: LoggedInService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        
        this.loggedInService.IsUserLoggedIn.next(false);
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    console.log(data);
                    this.loggedInService.IsUserLoggedIn.next(true);
                    this.router.navigate(['/customers']);
                },
                err => {
                    console.log(err.error)
                    this.alertService.error(err.error);
                    this.loading = false;
                });
    }

}