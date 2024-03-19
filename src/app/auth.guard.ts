import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { notNull } from './core/helpers/object.helper';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (notNull(localStorage.getItem('id_user'))) {
      return true;
  } else {
      router.navigate(['/login']);
      return false;
  }
};

