import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TablaempleadoService {

  constructor(public httpClient:HttpClient) { }
  getRegistro(): Observable<any> {
    return this.httpClient.get<any>(environment.END_POINTS.REGISTRO_EMPLEADOS);
  }

  getEmpleados(): Observable<any> {
    return this.httpClient.get<any>(environment.END_POINTS.REGISTRO_EMPLEADOS);
  }

  createRegistro(empleado: any): Observable<any> {
    return this.httpClient.put<any>(environment.END_POINTS.REGISTRO_EMPLEADOS,empleado);
  }

  deleteRegistro(id: string): Observable<any> {
    return this.httpClient.delete<any>(environment.END_POINTS.REGISTRO_EMPLEADOS,{body:{id}});
  }
  
  updateRegistro(empleado: any): Observable<any> {
    return this.httpClient.post<any>(environment.END_POINTS.REGISTRO_EMPLEADOS,empleado);
  }
}
