import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagoPlataformaService {

  constructor(public httpClient:HttpClient) { }

  verifyTarjeta(cardNumber:any): Observable<any> {
    return this.httpClient.get<any>(environment.END_POINTS.LUHN, { params: { cardNumber } });
  }

  verifyEmail(email:any): Observable<any> {
    return this.httpClient.get<any>(environment.END_POINTS.VERIFYEMAIL, { params: { email } });
  }
}
