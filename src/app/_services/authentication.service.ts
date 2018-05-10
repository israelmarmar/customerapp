import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {


    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = {
        headers: headers
    };


    return this.http.post<any>('/s/login/', body.toString(), options).map(user => {
                // login successful if there's a jwt token in the response
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user; 
            }

            );
    }

    logout() {
        // remove user from local storage to log user out
        console.log("logout");
        return this.http.get("/s/login/logout.php").map( resp => {
               console.log(resp);
               localStorage.removeItem('currentUser');

               return resp;
            }).subscribe();

    }
}