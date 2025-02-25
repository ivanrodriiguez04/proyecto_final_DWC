import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = 'http://localhost:8081/api/registro/usuario';  // Ajusta la URL según tu API

  constructor(private http: HttpClient) {}

  registrarUsuario(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, formData);
  }
}
