import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DietasService {

  constructor(public httpClient: HttpClient) { }

  getDietas(): Observable<any> {
    return this.httpClient.get<any>(`${environment.END_POINTS.DIETA}/all`);
  }

  deleteDieta( _id: any ): Observable<any> {

    console.log('_id recibido en servicio ', _id)
    return this.httpClient.delete<any>(`${environment.END_POINTS.DIETA}/delete`,{params: {_id}} );
  }

  createDieta ( dieta: any ): Observable<any>{
    return this.httpClient.put<any>(`${environment.END_POINTS.DIETA}/create`, dieta );
  }

  updateDieta( data: any ): Observable<any>{
    console.log("data updatedieta desde services ----- \n", data)
    return this.httpClient.post<any>(`${environment.END_POINTS.DIETA}/update`, data );
  }

  getDietasById(_id: any): Observable<any>{
    return this.httpClient.get<any>(`${environment.END_POINTS.DIETA}/getDieta`, _id);
  }
}
