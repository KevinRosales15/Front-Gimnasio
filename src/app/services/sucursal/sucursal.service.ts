import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { sucursal } from '../../models/sucursal';


@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  

  constructor(public httpClient:HttpClient) { }

  getSucursales(): Observable<any> {
    return this.httpClient.get<any>(environment.END_POINTS.SUCURSAL);
  }

  getSucursal(id: string): Observable<any> {
    return this.httpClient.get<any>(environment.END_POINTS.SUCURSAL,{params:{id}});
  }

  deleteSucursal(id: string): Observable<any> {
    return this.httpClient.delete<any>(environment.END_POINTS.SUCURSAL,{body:{id}});
  }

  createSucursal(sucursal: any): Observable<any> {
    return this.httpClient.put<any>(environment.END_POINTS.SUCURSAL,sucursal);
  }

  updateSucursal(sucursal: any): Observable<any> {
    return this.httpClient.post<any>(environment.END_POINTS.SUCURSAL,sucursal);
  }


}
