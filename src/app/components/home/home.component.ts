import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CuttextPipe } from '../../core/pipes/cuttext.pipe';
import { Product } from '../../core/interfaces/product';
import { Category } from '../../core/interfaces/category';
import { ProductService } from '../../core/services/product.service';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CuttextPipe, CarouselModule, RouterLink, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private _ProductService:ProductService, private _CartService:CartService,
    private _ToastrService: ToastrService, private _Renderer2:Renderer2,
    private _WishlistService:WishlistService){}
  productsData: Product[] = [];
  categoriesData: Category[] = [];
  searchValue:string = '';
  wishListIds:string[] = []

  ngOnInit(): void {
    this.getCategories();
    this.getUserWishlist();
    this.getProducts();
  }

  getCategories(){
    this._ProductService.getCategories().subscribe({
      next: (response) => {
        this.categoriesData = response.data;
      },
      error: (err) => {
        this._ToastrService.error('has error occured.', 'Error');
      }
    });
  }

  getProducts(){
    this._ProductService.getProducts().subscribe({
      next: (response) => {
        this.productsData = response.data;
      },
      error: (err) => {
        this._ToastrService.error('has error occured.', 'Error');
      }
    });
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

  getUserWishlist(){
    this._WishlistService.getUserWishList().subscribe({
      next: (response) => {
        const newData = response.data.map((item:any) => item._id)
        this.wishListIds = newData;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  addToWishlist(productId:string  | undefined):void{
    if(productId)
    {
      this._WishlistService.addToWishList(productId).subscribe({
        next: (response) => {
          this._ToastrService.success(response.message, 'Success');
          this.wishListIds = response.data;
          this._WishlistService.wishListNumber.next(response.data.length);
        },
        error: (err) => {
          this._ToastrService.error('has error occured.', 'Error');
        }
      })
    }
  }

  removeFromWishlist(productId:string  | undefined):void{
    if(productId)
    {
      this._WishlistService.removeFromWishList(productId).subscribe({
        next: (response) => {
          this._ToastrService.success(response.message, 'Success');
          this.wishListIds = response.data;
          this._WishlistService.wishListNumber.next(response.data.length);
        },
        error: (err) => {
          this._ToastrService.error('has error occured.', 'Error');
        }
      })
    }
  }

  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 2000,
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 2000,
    items: 1,
    nav: false
  }

}
