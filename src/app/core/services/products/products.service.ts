import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { allProducts, products } from '../../interfaces/products/products';
import { baseUrl } from '../../constants/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }


  getProducts(): Observable<any> {
    return this.http.get(`${baseUrl}/api/v1/products`);
  }

  getSpecificProduct(id:string): Observable<any> {
    return this.http.get(`${baseUrl}/api/v1/products/${id}`);
  }
}
