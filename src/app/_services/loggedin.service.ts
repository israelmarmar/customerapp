import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoggedInService {
    public IsUserLoggedIn: Subject<boolean> = new Subject<boolean>();
}