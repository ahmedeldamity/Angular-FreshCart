import { Component, OnInit, Renderer2 } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { Product } from '../../core/interfaces/product';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchPipe } from "../../core/pipes/search.pipe";
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { CuttextPipe } from "../../core/pipes/cuttext.pipe";

@Component({
    selector: 'app-wishlist',
    standalone: true,
    templateUrl: './wishlist.component.html',
    styleUrl: './wishlist.component.scss',
    imports: [CommonModule, RouterLink, SearchPipe, CuttextPipe]
})
export class WishlistComponent implements OnInit {
  constructor(private _WishlistService:WishlistService, private _CartService:CartService,
    private _ToastrService: ToastrService, private _Renderer2:Renderer2){}
  wishListData:Product[] = []
  wishListIds:string[] = []
  searchValue:string = ''

  ngOnInit(): void {
    this.getUserWishlist();
  }

  getUserWishlist(){
    this._WishlistService.getUserWishList().subscribe({
      next: (response) => {
        this.wishListData = response.data;
        const newData = response.data.map((item:any) => item._id)
        this.wishListIds = newData;
      },
      error: (err) => {
        this._ToastrService.error('has error occured.', 'Error');
      }
    })
  }

  removeFromWishlist(productId:string  | undefined):void{
    if(productId)
    {
      this._WishlistService.removeFromWishList(productId).subscribe({
        next: (response) => {
          this._ToastrService.success(response.message, 'Success');
          this._WishlistService.wishListNumber.next(response.data.length);
          this.wishListIds = response.data;
          this.wishListData = this.wishListData.filter((item:any) => this.wishListIds.includes(item._id))
        },
        error: (err) => {
          this._ToastrService.error('has error occured.', 'Error');
        }
      })
    }
  }

  addToCart(productId: string | undefined, element:HTMLButtonElement){
    if(productId)
    {
      this._Renderer2.setAttribute(element, 'disabled', 'true');
      this._CartService.addToCart(productId).subscribe({
        next: (response) => {
          this._ToastrService.success('Product Added To Cart.', 'Success');
          this._Renderer2.removeAttribute(element, 'disabled');
          this._CartService.cartNumber.next(response.numOfCartItems);
        },
        error: (err) => {
          this._ToastrService.error('has error occured.', 'Error');
          this._Renderer2.removeAttribute(element, 'disabled');
        }
      })
    }
  }

}
