import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Responses } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class FolderService extends ApiService{

  constructor(protected  http : HttpClient) {
    super(http);
    this.jsonConvert = new JsonConvert();
   }

  getAllFolder(): Observable<Responses> {
    let url ='/Folder';
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
          const odataRes: Responses = this.jsonConvert.deserializeObject(res, Responses);
          return odataRes;
      })
    )
  }
  createFolder(folder: any): Observable<Responses> {
    let url ='/Folder';
    return super.postEntity(url, folder).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        return res;
      })
    );
}
}