import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../../core/constants/baseUrl';
import { Auth } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: BehaviorSubject<JwtPayload | null> =
    new BehaviorSubject<JwtPayload | null>(null);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) id: object,
    private router: Router
  ) {
    if (isPlatformBrowser(id)) {
      if (localStorage.getItem('token') !== null) {
        this.tokenDecode();
      }
    }
  }

  register(form: Auth): Observable<any> {
    return this.http.post(`${baseUrl}/api/v1/auth/signup`, form);
  }

  login(form: Auth): Observable<any> {
    return this.http.post(`${baseUrl}/api/v1/auth/signin`, form);
  }

  forgetPassword(form: Auth): Observable<any> {
    return this.http.post(`${baseUrl}/api/v1/auth/forgotPasswords`, form);
  }

  verifyCode(form:Auth): Observable<any> {
    return this.http.post(`${baseUrl}/api/v1/auth/verifyResetCode`, form);
  }

  resetPassword(form:Auth): Observable<any> {
    return this.http.put(`${baseUrl}/api/v1/auth/resetPassword`, form);
  }

  logout() {
    localStorage.removeItem('token');
    this.userData.next(null);
    this.router.navigate(['/login']);
  }

  tokenDecode() {
    const token = localStorage.getItem('token') || '';
    const decoded = jwtDecode(token);
    this.userData.next(decoded);
  }
}
