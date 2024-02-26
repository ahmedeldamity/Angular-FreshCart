import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Category } from '../../core/interfaces/category';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute,
    private _ProductService:ProductService, private _ToastrService:ToastrService){}
  categoryId: string | null = null;
  categoryDetails:Category | null = null;

  ngOnInit(): void {
    this.categoryId = this._ActivatedRoute.snapshot.paramMap.get('id');
    this.getCategory();
  }

  getCategory(){
    if(this.categoryId)
    {
      this._ProductService.getCategory(this.categoryId).subscribe({
        next: (response) => {
          this.categoryDetails = response.data;
        },
        error: (err) => {
          this._ToastrService.error('has error occured.', 'Error');
        }
      })
    }
  }

}
