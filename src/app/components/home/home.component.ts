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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CuttextPipe, CarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private _ProductService:ProductService, private _CartService:CartService,
    private _ToastrService: ToastrService, private _Renderer2:Renderer2){}
  productsData: Product[] = [];
  categoriesData: Category[] = [];

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  getCategories(){
    this._ProductService.getCategories().subscribe({
      next: (response) => {
        this.categoriesData = response.data;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  getProducts(){
    this._ProductService.getProducts().subscribe({
      next: (response) => {
        this.productsData = response.data;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  addToCart(productId: string | undefined, element:HTMLButtonElement){
    if(productId)
    {
      this._Renderer2.setAttribute(element, 'disabled', 'true');
      this._CartService.addToCart(productId).subscribe({
        next: (response) => {
          this._ToastrService.success('Product Added To Cart.', 'Success', {positionClass: 'toast-bottom-right'});
          this._Renderer2.removeAttribute(element, 'disabled');
          this._CartService.cartNumber.next(response.numOfCartItems);
        },
        error: (err) => {
          this._ToastrService.error('has error occured.', 'Error', {positionClass: 'toast-bottom-right'});
          this._Renderer2.removeAttribute(element, 'disabled');
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
