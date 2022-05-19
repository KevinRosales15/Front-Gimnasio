import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistroClientesService {

  constructor(public httpClient:HttpClient) { }

  putDatos(data:any): Observable<any> {
    console.log('data',data);
    return this.httpClient.put<any>(environment.END_POINTS.REGISTRO_CLIENTES, {}, { params: data });
  }
}
