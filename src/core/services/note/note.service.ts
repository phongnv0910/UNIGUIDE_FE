import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService extends ApiService{

  constructor(protected http : HttpClient) {
    super(http);
    this.jsonConvert = new JsonConvert();
   }

   note(formData: any): Observable<any> {
    let url = '/Note';
    return super.postEntity(url, formData).pipe()
 
  }
  
}
