import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }
  baseUrl:string = 'https://ecommerce.routemisr.com/api/v1/';
  myToken:any = {
    token: localStorage.getItem('etoken')
  }
  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0);

  addToCart(id:string):Observable<any>{
    return this._HttpClient.post(this.baseUrl + 'cart',
    {
      productId: id
    },
    {
      headers: this.myToken
    })
  }

  getCartUser():Observable<any>{
    return this._HttpClient.get(this.baseUrl + 'cart', {
      headers: this.myToken
    })
  }

  removeCartItem(productId:string):Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `cart/${productId}` , {
      headers: this.myToken
    })
  }

  updateCartCount(productId:string, productCount:number):Observable<any>{
    return this._HttpClient.put(this.baseUrl + `cart/${productId}`,
    {
      count: productCount
    },
    {
      headers: this.myToken
    })
  }

  clearCart():Observable<any>{
    return this._HttpClient.delete(this.baseUrl + 'cart' , {
      headers: this.myToken
    })
  }

}
