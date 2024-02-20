import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService, private _Router:Router){}
  errorMessage:string = '';
  isLoading:boolean = false;

  registerForm:FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_!@#$%^&*]{6,}$/)]),
    rePassword: new FormControl(''),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  },{validators:[this.confirmPassword]} as FormControlOptions);

  confirmPassword(group:FormGroup):void{
    let password = group.get('password');
    let rePassword = group.get('rePassword');

    if(rePassword?.value == ''){
      rePassword?.setErrors({required:true})
    }
    else if(password?.value != rePassword?.value){
      rePassword?.setErrors({mismatch:true})
    }
  }

  handleForm():void{
    this.isLoading = true;
    const userData = this.registerForm.value;

    if(this.registerForm.valid){
      this._AuthService.register(userData).subscribe({
        next:(response) => {
          if(response.message == 'success'){
            this._Router.navigate(['/login'])
          }
        },
        error:(err) => {
          console.log("aa", err.error.message)
          this.errorMessage = err.error.message;
        }
      });
    }
    this.isLoading = false;
  }

}
