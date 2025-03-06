import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories } from '../../interfaces/categories/categories';
import { baseUrl } from '../../constants/baseUrl';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }

  getCategories():Observable<Categories> {
    return this.http.get<Categories>(`${baseUrl}/api/v1/categories`);
  }
}
