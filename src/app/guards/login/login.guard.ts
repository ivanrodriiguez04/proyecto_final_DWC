import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../../servicios/login/login.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  
  const userRole = loginService.getUserRole();

  if (userRole) {
    // Si el usuario está autenticado, redirigirlo a su página correspondiente
    if (userRole === 'administrador') {
      router.navigate(['/administrador']);
    } else {
      router.navigate(['/cuentas']);
    }
    return false; // Bloquea el acceso a /login si el usuario ya está autenticado
  }

  return true; // Permite acceder al login si el usuario NO ha iniciado sesión
};
