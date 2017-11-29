import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { News } from "./news.model";
import { config } from "../common/config";
import { Observable } from "rxjs/Observable";
import { ResponseBase } from "../common/responseBase";


@Injectable()
export class NewsService {
    Newses: News[]
    apiPath: string;

    constructor(private http: HttpClient) {
        this.apiPath = config.URLS.root + config.URLS.news;
    }

    getNewses() : Observable<ResponseBase> {
        return this.http.get<ResponseBase>(this.apiPath);
    }

    getNews(id: string) : Observable<ResponseBase> {
        return this.http.get<ResponseBase>(this.apiPath + '/' + id);
    } 

    addNews(news: News): Observable<ResponseBase> {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.post<ResponseBase>(this.apiPath + token, news);
    }

    deleteNews(news: News): Observable<ResponseBase> {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.put<ResponseBase>(this.apiPath + token, news);
    }
}