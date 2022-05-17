import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DietaService {

  constructor(public httpClient: HttpClient) { }

  getDietas(): Observable<any> {
    return this.httpClient.get<any>(`${environment.END_POINTS.DIETAS}/all`);
  }

  deleteDieta(_id: any): Observable<any> {
    return this.httpClient.delete<any>(`${environment.END_POINTS.DIETAS}/all`, { params:{_id}} );
  }

  createDieta ( id_dieta: any, id_objetivo: any, nivel: any, tiempo: any, alimentos: any, carbohidratos: any, proteinas: any, peso: any){
    return this.httpClient.put<any>(`${environment.END_POINTS.DIETAS}/all`, { params:{id_dieta, id_objetivo, nivel, tiempo, alimentos, carbohidratos, proteinas, peso}} )
  }

}
