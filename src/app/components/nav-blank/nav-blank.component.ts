import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {
  constructor(private _Router:Router, private _CartService:CartService){}
  cartNumber:number = 0;

  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next: (response) => {
        this.cartNumber = response;
      }
    })

    this._CartService.getCartUser().subscribe({
      next: (response) => {
        this.cartNumber = response.numOfCartItems;
      }
    })
  }

  signOut():void{
    localStorage.removeItem('etoken');
    this._Router.navigate(['/login']);
  }

}
