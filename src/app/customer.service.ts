import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { catchError, map, tap } from 'rxjs/operators';

import { Customer } from './customer';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessageService } from './message.service';

import { DomSanitizer } from '@angular/platform-browser';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class CustomerService {
  urlmap: any;
  customer: any;

  constructor(private http: HttpClient,
    private messageService: MessageService,
    private sanitizer: DomSanitizer) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>("/s/board/")
      .pipe(
        tap(customer => this.log(`fetched customers`)),
        catchError(this.handleError('getCustomers', []))
      );
  }

  getCustomer(id: number): Observable<Customer> {
    console.log(id);
    const url = `/s/board/?id=${id}`;
     return this.http.get<Customer>(url).pipe(
      tap(_ => this.log(`fetched Customer id=${id}`)),
      catchError(this.handleError<Customer>(`getCustomer id=${id}`))
    )
  }

  private log(message: string) {
    this.messageService.add('CostumerService: ' + message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
