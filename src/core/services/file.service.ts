import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Responses } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class FileService extends ApiService{

  constructor(protected http : HttpClient

  ) {
    super(http);
    this.jsonConvert = new JsonConvert();
  }
  getFileByIdFolder(idFolder: number): Observable<Responses> {
    let url = `/File?folderId=${idFolder}`;
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
  createFile(folder: any): Observable<Responses> {
    let url ='/File';
    return super.postEntity(url, folder).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        return res;
      })
    );
}
}
