import { Component, OnInit, Renderer2 } from '@angular/core';
import { Product } from '../../core/interfaces/product';
import { ProductService } from '../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CuttextPipe } from "../../core/pipes/cuttext.pipe";
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
    selector: 'app-products',
    standalone: true,
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
    imports: [CommonModule, RouterLink, CuttextPipe, NgxPaginationModule]
})
export class ProductsComponent implements OnInit {
  constructor(private _ProductService:ProductService, private _Renderer2:Renderer2,
    private _CartService:CartService, private _ToastrService:ToastrService){}
  productsData: Product[] = [];
  pageSize:number = 0;
  currentPage:number = 1;
  total:number = 0;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this._ProductService.getProducts(this.currentPage).subscribe({
      next: (response) => {
        this.productsData = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
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

  pageChanged(event:any):void{
    if(this.currentPage !== event)
    {
      this.currentPage = event;
      this.getProducts();
    }
  }

}
