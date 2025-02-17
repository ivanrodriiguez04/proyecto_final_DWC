import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8081/api/login/validarUsuario';

  constructor(private http: HttpClient) {}

  login(credentials: { emailUsuario: string; passwordUsuario: string }): Observable<string> {
    return this.http.post<string>(this.apiUrl, credentials);
  }

  setUserRole(role: string) {
    localStorage.setItem('userRole', role);
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  logout(): void {
    localStorage.removeItem('userRole');
  }
}
