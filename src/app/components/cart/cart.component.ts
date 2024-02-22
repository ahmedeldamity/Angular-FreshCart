import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  constructor(private _CartService:CartService, private _ToastrService: ToastrService,
    private _Renderer2:Renderer2){}
  cartDetails:any;

  ngOnInit(): void {
    this.getCartUser();
  }

  getCartUser(){
    this._CartService.getCartUser().subscribe({
      next: (response) => {
        this.cartDetails = response.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  removeCartItem(id:string, btnRemove:HTMLButtonElement){
    this._Renderer2.setAttribute(btnRemove, 'disabled', 'true')
    this._CartService.removeCartItem(id).subscribe({
      next: (response) => {
        this._ToastrService.success('Product Deleted Successfully', 'Success', {positionClass: 'toast-bottom-right'})
        this.cartDetails = response.data;
        this._Renderer2.removeAttribute(btnRemove, 'disabled');
        this._CartService.cartNumber.next(response.numOfCartItems);
      },
      error: (err) => {
        this._ToastrService.error('has error occured.', 'Error', {positionClass: 'toast-bottom-right'})
        this._Renderer2.removeAttribute(btnRemove, 'disabled')
      }
    })
  }

  changeCount(productId:string, productCount:number, btnPlus:HTMLButtonElement, btnMinus:HTMLButtonElement): void{
    if(productCount == 0){
      this._ToastrService.info('if you sure to remove product use remove button.', 'Not Allowed', {positionClass: 'toast-bottom-right'})
    }
    else{
      this._Renderer2.setAttribute(btnMinus, 'disabled', 'true');
      this._Renderer2.setAttribute(btnPlus, 'disabled', 'true');
      this._CartService.updateCartCount(productId, productCount).subscribe({
        next: (response) => {
          this.cartDetails = response.data;
          this._Renderer2.removeAttribute(btnMinus, 'disabled');
          this._Renderer2.removeAttribute(btnPlus, 'disabled');
        },
        error: (err) => {
          this._Renderer2.removeAttribute(btnMinus, 'disabled');
          this._Renderer2.removeAttribute(btnPlus, 'disabled');
        }
      })
    }
  }

  clearCart():void{
    this._CartService.clearCart().subscribe({
      next: (response) => {
        if(response.message === "success"){
          this.cartDetails = response.data;
          this._CartService.cartNumber.next(0);
        }
      },
      error: (err) => {
        this._ToastrService.error('has error occured.', 'Error', {positionClass: 'toast-bottom-right'})
      }
    });
  }


}
