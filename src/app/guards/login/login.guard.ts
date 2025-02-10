import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

export const loginGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  return user(auth).pipe(
    map(user => {
      if(user) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }),
  );
};
