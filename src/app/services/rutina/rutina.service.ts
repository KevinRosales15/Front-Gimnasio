import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {

  constructor(public httpClient: HttpClient) { }

  getRutinas(): Observable<any> {
    return this.httpClient.get<any>(`${environment.END_POINTS.RUTINAS}/all`);
  }
}
