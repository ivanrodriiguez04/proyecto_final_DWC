import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8081/api/login/validarUsuario';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  login(credentials: { emailUsuario: string; passwordUsuario: string }): Observable<{ role: string }> {
    return this.http.post(this.apiUrl, credentials, { responseType: 'text' }) // Especificamos 'text'
      .pipe(
        map(response => {
          // Convertimos la respuesta en un objeto JSON
          return { role: response };
        })
      );
  }

  setUserRole(role: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userRole', role);
    }
  }

  getUserRole(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('userRole');
    }
    return null;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('userRole');
    }
  }
}
