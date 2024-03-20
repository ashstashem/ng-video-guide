import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  return new Promise((resolve, reject) => {
    const router = inject(Router);
    const loggedIn = localStorage.getItem('loggedIn');

    if(loggedIn === 'true') {
      resolve(true);
    } else {
      router.navigate(['/login']);
      resolve(false);
    }
  });
};
