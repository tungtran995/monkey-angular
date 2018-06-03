import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { User } from './../models/user.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    constructor(
        private httpClient : HttpClient
        ) { }
    check() : boolean {
        return localStorage.getItem('token') ? true : false;
    }
    login(credentials : {email: string, password: string}): Observable<boolean>{
        return this.httpClient.post<any>(`${environment.api_url}/auth/login`,credentials)
        .do(data => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', btoa(JSON.stringify(data.user)));           
        });
    }
}