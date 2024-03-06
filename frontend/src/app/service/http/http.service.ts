import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }
  get<T>(url: string):Observable<T> {
    return this.http.get<T>(url);
  }
  getBlobData(url: string){
    return this.http.get(url,{responseType:'blob'});
  }
}
