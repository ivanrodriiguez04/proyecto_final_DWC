import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8081/api/login/validarUsuario';

  // BehaviorSubjects para el estado reactivo del usuario
  private userSubject = new BehaviorSubject<{ role: string | null; email: string | null }>({
    role: this.getUserRole(),
    email: this.getUserEmail()
  });

  user$ = this.userSubject.asObservable(); // Exponemos el observable

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  login(credentials: { emailUsuario: string; passwordUsuario: string }): Observable<{ role: string; email: string }> {
    return this.http.post(this.apiUrl, credentials, { responseType: 'text' }) // Especificamos 'text'
      .pipe(
        map(response => {
          const userRole = response;
          const userEmail = credentials.emailUsuario;
          this.setUserRole(userRole);
          this.setUserEmail(userEmail);

          // Emitimos los nuevos valores al observable
          this.userSubject.next({ role: userRole, email: userEmail });

          return { role: userRole, email: userEmail };
        })
      );
  }

  setUserRole(role: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userRole', role);
      this.userSubject.next({ role, email: this.getUserEmail() }); // Emitimos cambios
    }
  }

  getUserRole(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('userRole');
    }
    return null;
  }

  setUserEmail(email: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userEmail', email);
      this.userSubject.next({ role: this.getUserRole(), email }); // Emitimos cambios
    }
  }

  getUserEmail(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('userEmail');
    }
    return null;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
      this.userSubject.next({ role: null, email: null }); // Emitimos cambios
    }
  }
}
