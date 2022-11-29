import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  host=environment.host
  baseApiUrl = this.host+"upload"

    
  constructor(private http:HttpClient) { }
  
  upload(file: File):Observable<any> {
      const formData = new FormData(); 
      formData.append("file", file, file.name);
      return this.http.post(this.baseApiUrl, formData)
  }
}
