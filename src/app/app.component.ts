import { Component, OnInit } from '@angular/core';
import { LoggedInService } from './_services/loggedin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent {
  title = 'Customers manager';
  isUserLoggedIn: boolean;

  constructor(private loggedInService: LoggedInService) { }


  ngOnInit() {

        // Subscribe here, this will automatically update 
        // "isUserLoggedIn" whenever a change to the subject is made.
        this.loggedInService.IsUserLoggedIn.subscribe( value => {
            this.isUserLoggedIn = value;
        });

        this.loggedInService.IsUserLoggedIn.next(localStorage.getItem('currentUser')!==null);
    }


}
