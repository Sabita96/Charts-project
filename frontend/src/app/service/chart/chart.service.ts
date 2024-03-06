import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
   apiUrl = `${environment.apiUrl}excel`;
  constructor(private http: HttpService) { }

  readExcel(){
    return this.http.get(`${this.apiUrl}/read`);
  }

  downloadExcel():Observable<Blob> {
    return this.http.getBlobData(`${this.apiUrl}/downloadExcel`);
  }

  downloadPDF():Observable<{ pdfUrl: string }> {
    return this.http.get(`${this.apiUrl}/downloadPDF`);
  }
  
}

