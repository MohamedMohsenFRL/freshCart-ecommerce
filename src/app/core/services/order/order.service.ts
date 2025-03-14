import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { Observable } from 'rxjs';
import { baseUrl } from '../../constants/baseUrl';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient, private cart: CartService) {}

  cartCheckout(cartId: string, shipData: {}): Observable<any> {
    return this.http.post(
      `${baseUrl}/api/v1/orders/checkout-session/${cartId}?url=https://fresh-cart-alzd6uw9c-mohamed-mohsens-projects-0329cf79.vercel.app/`,
      {
        shippingAddress: shipData,
      }
    );
  }

  cashCheckout(cartId: string, shipData: {}): Observable<any> {
    return this.http.post(`${baseUrl}/api/v1/orders/${cartId}`, {
      shippingAddress: shipData,
    });
  }

  getOrder(cartId: string): Observable<any> {
    return this.http.get(`${baseUrl}/api/v1/orders/user/${cartId}`);
  }
}
