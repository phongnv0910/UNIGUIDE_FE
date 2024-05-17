import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends ApiService{

  constructor(protected http : HttpClient) {
    super(http);
    this.jsonConvert = new JsonConvert();
   }

   login(formData: any) : Observable<any>{
      let url =  '/Account/Auth';
      return super.postEntity(url, formData).pipe(
        catchError((err) => throwError(() => new Error(err))),
        map((res) => {
          console.log('res', res);
          return res;
        
        })
      );
   }
}
