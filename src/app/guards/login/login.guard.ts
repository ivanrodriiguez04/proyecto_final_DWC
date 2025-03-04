import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../../servicios/login/login.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const userRole = loginService.getUserRole();
  console.log(userRole);
  if (userRole==='admin') {
    //router.navigate(['/administrador']);
    return true;
  }
  router.navigate(['/login']);
  return false;
};
