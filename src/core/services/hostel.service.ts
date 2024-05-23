import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Responses } from '../models/response.model';

@Injectable({
    providedIn: 'root'
})
export class HostelService extends ApiService {

    constructor(protected http: HttpClient) {
        super(http);
        this.jsonConvert = new JsonConvert();
    }

    getHostels(): Observable<Responses> {
        let url = '/hostels';
        return super.get(url).pipe(
            catchError((err) => throwError(() => new Error(err))),
            map((res) => {
                const odataRes: Responses = this.jsonConvert.deserializeObject(res, Responses);
                return odataRes;
            })
        );
    }

    createHostel(hostel: any): Observable<Responses> {
        let url = '/hostels';
        return super.postEntity(url, hostel).pipe(
            catchError((err) => throwError(() => new Error(err))),
            map((res) => {
                return res;
            })
        );
    }

    
    getList(params: any): Observable<Responses> {
        let url = '/Hostel/list';
        return super.postEntity(url, { params }).pipe(
            catchError((err) => throwError(() => new Error(err))),
            map((res) => {
                const odataRes: Responses = this.jsonConvert.deserializeObject(res, Responses);
                return odataRes;
            })
        );
    }
}