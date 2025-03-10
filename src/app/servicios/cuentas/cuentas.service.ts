import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CuentasService {
  private apiUrl = 'http://localhost:8081/api/cuentas';

  constructor(private http: HttpClient) {}

  obtenerCuentasPorEmail(email: string) {
    return this.http.get<any[]>(`${this.apiUrl}/usuario/email/${email}`);
  }

  crearCuenta(cuenta: any) {
    return this.http.post(`${this.apiUrl}/crear`, cuenta);
  }
}
