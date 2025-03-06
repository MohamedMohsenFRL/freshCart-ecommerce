import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const id = inject(PLATFORM_ID);

  if(req.url.includes('cart') || req.url.includes('orders') || req.url.includes('wish')) {
    if (isPlatformBrowser(id)) {
      req = req.clone({
        setHeaders: {
          token: localStorage.getItem('token')!
        }
      })
      localStorage.setItem('userId', (jwtDecode(localStorage.getItem('token')!) as { id: string }).id);
      return next(req);
    }
  }

  return next(req);

};
