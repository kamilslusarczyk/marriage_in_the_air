import { User } from "./user.model";
import { Injectable, EventEmitter } from "@angular/core";
import { config } from "../common/config";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { ResponseBase } from "../common/responseBase";

@Injectable()
export class AuthService {
    signInPath: string;
    dummyPath: string;
    signInEvent : EventEmitter<boolean>;


    constructor(private http: HttpClient) {
        this.dummyPath = config.URLS.root + config.URLS.admin + config.URLS.adminDummyCreate;
        this.signInPath = config.URLS.root + config.URLS.admin + config.URLS.adminSignIn;
        this.signInEvent = new EventEmitter<boolean>();
    }

    signup(user: User): Observable<ResponseBase> {
        return this.http.post<ResponseBase>(this.dummyPath, user);
    }

    signin(user: User): Observable<ResponseBase> {
        return this.http.post<ResponseBase>(this.signInPath, user);
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }

    getUserId(){
        return this.isLoggedIn() ? localStorage.getItem("userId") : null;
    }

    //this is for route creation to call API in Node.js
    getToken(){
        return localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    }

    getTokenForStatistics() {
        return localStorage.getItem('token');
    }
}