import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute, private _ProductService:ProductService) {}
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
