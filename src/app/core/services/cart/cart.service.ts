import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../constants/baseUrl';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  // counter:BehaviorSubject<number> = new BehaviorSubject<number>(0);
  counter:WritableSignal<number> = signal(0);

  addToCart(id: string): Observable<any> {
    return this.http.post(`${baseUrl}/api/v1/cart`,
      {
        productId: id,
      },
    );
  }

  getFromCart(): Observable<any> {
    return this.http.get(`${baseUrl}/api/v1/cart`);
  }

  updateCart(productId: string, count: number): Observable<any> {
    return this.http.put(
      `${baseUrl}/api/v1/cart/${productId}`,
      {
        count: count,
      }
    );
  }

  removeSpecificProduct(productId: string): Observable<any> {
    return this.http.delete(`${baseUrl}/api/v1/cart/${productId}`);
  }

  removeAllProduct(): Observable<any> {
    return this.http.delete(`${baseUrl}/api/v1/cart`);
  }
}

