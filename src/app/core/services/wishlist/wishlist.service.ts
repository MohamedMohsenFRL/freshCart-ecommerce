import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../constants/baseUrl';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {

  wishedId: WritableSignal<string[]> = signal([]);

  constructor(private http: HttpClient,@Inject(PLATFORM_ID) private id: object) {
    if (isPlatformBrowser(this.id)) {
      this.wishedId.set(JSON.parse(localStorage.getItem('wishlist') || '[]'));
    }
  }

  addToWishlist(id: string): Observable<any> {
    return this.http.post(`${baseUrl}/api/v1/wishlist`, { productId: id });
  }

  removeFromWishlist(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/api/v1/wishlist/${id}`);
  }

  getWishlist(): Observable<any> {
    return this.http.get(`${baseUrl}/api/v1/wishlist`);
  }
}
