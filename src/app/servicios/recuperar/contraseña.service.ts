import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContraseñaService {

  private apiUrl = 'http://localhost:8081/api/password';

  constructor(private http: HttpClient) {}

  recuperarPassword(emailUsuario: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/recuperar`, { emailUsuario }, { observe: 'response' });
  }  

  cambiarPassword(token: string, password: string): Observable<any> {
    const body = { token, passwordUsuario: password };
    return this.http.post(`${this.apiUrl}/restablecer`, body);
  }
}
