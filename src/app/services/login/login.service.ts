import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public httpClient:HttpClient) { }

  verifyMora(date:any): Observable<any> {
    return this.httpClient.get<any>(environment.END_POINTS.LOGIN, { params: date });
  }

  logIn(credentials:any): Observable<any> {
    return this.httpClient.post<any>(environment.END_POINTS.LOGIN, {}, { params: credentials });
  }
}
