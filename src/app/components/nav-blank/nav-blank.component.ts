import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {
  constructor(private _Router:Router, private _CartService:CartService,
    private _Renderer2:Renderer2){}

  cartNumber:number = 0;
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
