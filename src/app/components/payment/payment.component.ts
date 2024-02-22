import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute, private _CartService:CartService){}
  cartId:string | null = null;

  ngOnInit(): void {
    this.cartId = this._ActivatedRoute.snapshot.paramMap.get('id');
  }

  orderForm:FormGroup = new FormGroup({
    details: new FormControl(''),
    phone: new FormControl(''),
    city: new FormControl('')
  })

  handleForm():void{
    if(this.cartId && this.orderForm)
    {
      this._CartService.checkOut(this.cartId, this.orderForm.value).subscribe({
        next:(response) => {
          console.log("aa")
          if(response.status === "success")
            open(response.session.url, '_self');
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
    else{
      console.log("payment error")
    }
  }

}
