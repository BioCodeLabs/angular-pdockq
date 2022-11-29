import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Payload } from '../interfaces/payload';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {
  host=environment.host;

  baseApiUrl=this.host+"download";

  

  constructor(private http:HttpClient) { }

  download(data:Payload[]): Observable<any>{
    const httpOptions = {
      responseType: 'blob' as 'json'
    };
  
    //return this.http.get(`${this.BASE_URL}/help/pdf`, httpOptions);
    return this.http.post(this.baseApiUrl, data,httpOptions);
}

}
