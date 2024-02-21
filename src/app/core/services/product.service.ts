import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient:HttpClient) { }

  baseUrl:string = 'https://ecommerce.routemisr.com/api/v1/';

  getProducts():Observable<any>{
    return this._HttpClient.get(this.baseUrl + 'products');
  }

  getProduct(id:string):Observable<any>{
    return this._HttpClient.get(this.baseUrl + 'products/' + id);
  }

  getCategories():Observable<any>{
    return this._HttpClient.get(this.baseUrl + 'categories');
  }

}
