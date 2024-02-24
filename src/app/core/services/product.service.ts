import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient:HttpClient) { }

  baseUrl:string = 'https://ecommerce.routemisr.com/api/v1/';

  getProducts(pageNumber:number = 1):Observable<any>{
    let params = new HttpParams();
    params = params.append('page', pageNumber);

    return this._HttpClient.get(this.baseUrl + 'products', {params});
  }

  getProduct(id:string):Observable<any>{
    return this._HttpClient.get(this.baseUrl + 'products/' + id);
  }

  getCategories():Observable<any>{
    return this._HttpClient.get(this.baseUrl + 'categories');
  }

}
