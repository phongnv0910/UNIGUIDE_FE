import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { Observable, catchError, map, throwError } from 'rxjs';
import { University } from '../models/database/db.model';
import { Responses } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class UnversityService extends ApiService {

  constructor(protected http : HttpClient) { 
    super(http);
    this.jsonConvert = new JsonConvert();
  }
  getAllUniversity(): Observable<Responses> {
    let url = '/University';
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
          console.log('res', res);
          const odataRes: Responses = this.jsonConvert.deserializeObject(res, Responses);
          console.log('odataRes', odataRes);
          return odataRes;
      })
  );
}
}
