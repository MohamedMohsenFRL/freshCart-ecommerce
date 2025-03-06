import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brands } from '../../interfaces/brands/brands';
import { baseUrl } from '../../constants/baseUrl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private http:HttpClient) { }

  getBrands():Observable<Brands> {
    return this.http.get<Brands>(`${baseUrl}/api/v1/brands`);
  }

  getSpecificBrands(id:string):Observable<Brands> {
    return this.http.get<Brands>(`${baseUrl}/api/v1/brands/${id}`);
  }

}
