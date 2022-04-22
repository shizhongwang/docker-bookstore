import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private baseUrl = "http://49.7.182.249:9200/upload";
  private getFileUrl = "http://49.7.182.249:9200/getFiles";

  // private baseUrl = "http://localhost:8080/upload";
  // private getFileUrl = "http://localhost:8080/getFiles";

  constructor(private http: HttpClient) {}

  uploadFiles(file: File): Observable<HttpEvent<{}>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const request = new HttpRequest('POST', this.baseUrl, formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(request);
  }

  getFiles(): Observable<any> {
    return this.http.get(this.getFileUrl);
  }
}
