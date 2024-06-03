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
export class TodolistService extends ApiService {

  constructor(protected http : HttpClient) { 
    super(http);
    this.jsonConvert = new JsonConvert();
  }
  getAllToDoList(id: any): Observable<Responses> {
    let url = `/File/ToDoList?fileId=${id}`;
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
createDo(formData: any): Observable<Responses> {
  let url = `/File/ToDoList`;
  return super.postEntity(url, formData).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
          return res;
      })
  );
}
updateDo(formData: any): Observable<Responses> {
  let url = `/File/ToDoList`;
  return super.putEntity(url, formData).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
          return res;
      })
  );
}
DeleteToDoList(id: any): Observable<Object> {
  return super.deleteEntity('/File/ToDoList', id).pipe(
    catchError((err) => {
      return throwError(() => err);
    })
  );
}
}