import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ForgetpasswordService } from '../../core/services/forgetpassword.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {
  constructor(private _ForgetpasswordService:ForgetpasswordService,
    private _ToastrService: ToastrService, private _Router:Router){}
  step1:boolean = true;
  step2:boolean = false;
  step3:boolean = false;
  email:string = '';

  forgetForm:FormGroup = new FormGroup({
    email:new FormControl('')
  })

  resetCodeForm:FormGroup = new FormGroup({
    resetCode:new FormControl('')
  })

  resetPasswordFrom:FormGroup = new FormGroup({
    newPassword:new FormControl('')
  })

  forgetPassword():void{
    this.email = this.forgetForm.value.email;
    this._ForgetpasswordService.forgetPassword(this.forgetForm.value).subscribe({
      next:(response) => {
        this.step1 = false;
        this.step2 = true;
        this._ToastrService.success(response.message, 'Success', {positionClass: 'toast-bottom-right'});
      },
      error:(err) => {
        this._ToastrService.error(err.error.message, 'Error', {positionClass: 'toast-bottom-right'});
      }
    });
  }

  resetCode():void{
    this._ForgetpasswordService.resetCode(this.resetCodeForm.value).subscribe({
      next:(response) => {
        this.step2 = false;
        this.step3 = true;
        this._ToastrService.success(response.message, 'Success', {positionClass: 'toast-bottom-right'});
      },
      error:(err) => {
        this._ToastrService.error(err.error.message, 'Error', {positionClass: 'toast-bottom-right'});
      }
    });
  }

  resetPassword():void{
    let resetPasswordData = this.resetPasswordFrom.value;
    resetPasswordData.email = this.email;
    this._ForgetpasswordService.resetPassword(resetPasswordData).subscribe({
      next:(response) => {
        if(response.token)
        {
          localStorage.setItem('etoken', response.token);
          this.step3 = false;
          this.step1 = true;
          this._ToastrService.success(response.message, 'Success', {positionClass: 'toast-bottom-right'});
          this._Router.navigate(['/home'])
        }
      },
      error:(err) => {
        this._ToastrService.error(err.error.message, 'Error', {positionClass: 'toast-bottom-right'});
      }
    });
  }

}
