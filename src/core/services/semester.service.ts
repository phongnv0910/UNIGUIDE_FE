import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { Responses } from '../models/response.model';
import { Observable, catchError, map, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SemesterService extends ApiService {

  constructor(protected http : HttpClient) { 
    super(http);
    this.jsonConvert = new JsonConvert();
  }
  getMSemesterByIdUniAndIdMajor(idUni: number, idMajor: number): Observable<Responses> {
    let url = `/Semester?universityId=${idUni}&majorId=${idMajor}`;
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
