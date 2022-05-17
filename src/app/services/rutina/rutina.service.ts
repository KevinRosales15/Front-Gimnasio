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

  deleteRutina(id: string): Observable<any> {
    return this.httpClient.delete<any>(environment.END_POINTS.RUTINAS,{body:{id}});
  }

  createRutina(rutina: any): Observable<any> {
    return this.httpClient.put<any>(environment.END_POINTS.RUTINAS,rutina);
  }
}
