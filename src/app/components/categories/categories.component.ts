import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Category } from '../../core/interfaces/category';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  constructor(private _ProductService:ProductService, private _ToastrService:ToastrService){}
  categoriesData: Category[] = []

  ngOnInit(): void {
    this.getCategories();
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

}
