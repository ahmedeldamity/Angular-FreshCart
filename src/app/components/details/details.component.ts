import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute, private _ProductService:ProductService,
    private _Renderer2:Renderer2, private _CartService:CartService,
    private _ToastrService:ToastrService) {}
  productId?: string | null;
  productDetails :any;

  ngOnInit(): void {
    this.productId = this._ActivatedRoute.snapshot.paramMap.get('id');
    if(this.productId)
      this._ProductService.getProduct(this.productId).subscribe({
        next: ({data}) => {
          this.productDetails = data;
        },
        error: (err) => {
          console.log(err);
        }
      })
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

  productDetailsOptions: OwlOptions = {
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
