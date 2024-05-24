import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Responses } from '../models/response.model';
@Injectable({
  providedIn: 'root'
}) 
export class ClubService extends ApiService {

  constructor(protected override http : HttpClient) {
    super(http);
    this.jsonConvert = new JsonConvert();
   }
   getClub(): Observable<Responses> {
    let url = `/Club/Recruitment`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
          console.log('res', res);
          const odataRes: Responses = this.jsonConvert.deserializeObject(res, Responses);
          console.log('odataRes', odataRes);
          return odataRes;
      })
  )
  }
}
