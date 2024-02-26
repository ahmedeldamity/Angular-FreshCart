import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {
  constructor(private _Router:Router, private _CartService:CartService,
    private _Renderer2:Renderer2, private _WishlistService:WishlistService){}

  cartNumber:number = 0;
  wishListNumber:number = 0;
  @ViewChild('navBar') navBar!:ElementRef;

  @HostListener('window:scroll')
  onScroll():void{
    if(scrollY > 500)
    {
      this._Renderer2.addClass(this.navBar.nativeElement, 'px-5');
      this._Renderer2.addClass(this.navBar.nativeElement, 'shadow');
    }
    else
    {
      this._Renderer2.removeClass(this.navBar.nativeElement, 'px-5');
      this._Renderer2.removeClass(this.navBar.nativeElement, 'shadow');
    }
  }

  ngOnInit(): void {
    this.getCartNumberFromAPI();
    this.getCartNumberFromService();
    this.getWishlistNumberFromAPI();
    this.getWishlistNumberFromService();

  }

  getCartNumberFromAPI(){  // this function not subscribe on cartNumber which exist in service but bring cartNumber from API in the first time
    this._CartService.getCartUser().subscribe({
      next: (response) => {
        this.cartNumber = response.numOfCartItems;
      }
    });
  }

  getCartNumberFromService(){ // this function subscribe on cartNumber which exist in service so it bring cartNumber in any change on it
    this._CartService.cartNumber.subscribe({
      next: (response) => {
        this.cartNumber = response;
      }
    });
  }

  getWishlistNumberFromAPI(){ // this function not subscribe on wishlistNumber which exist in service but bring wishlistNumber from API in the first time
    this._WishlistService.getUserWishList().subscribe({
      next: (response) => {
        this.wishListNumber = response.count;
      }
    });
  }

  getWishlistNumberFromService(){ // this function subscribe on wishlistNumber which exist in service so it bring wishlistNumber in any change on it
    this._WishlistService.wishListNumber.subscribe({
      next: (response) => {
        this.wishListNumber = response;
      }
    });
  }

  signOut():void{
    localStorage.removeItem('etoken');
    this._Router.navigate(['/login']);
  }

}
