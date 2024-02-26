import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }
  baseUrl:string = 'https://ecommerce.routemisr.com/api/v1/';


  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0);

  addToCart(id:string):Observable<any>{
    return this._HttpClient.post(this.baseUrl + 'cart',
    {
      productId: id
    })
  }

  getCartUser():Observable<any>{
    return this._HttpClient.get(this.baseUrl + 'cart');
  }

  removeCartItem(productId:string):Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `cart/${productId}`);
  }

  updateCartCount(productId:string, productCount:number):Observable<any>{
    return this._HttpClient.put(this.baseUrl + `cart/${productId}`,
    {
      count: productCount
    })
  }

  clearCart():Observable<any>{
    return this._HttpClient.delete(this.baseUrl + 'cart');
  }

  checkOut(cartId:string, orderInfo:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl + `orders/checkout-session/${cartId}?url=http://localhost:4200`,
    {
      shippingAddress: orderInfo
    })
  }

}
