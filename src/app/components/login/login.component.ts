import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private _AuthService:AuthService, private _Router:Router){}
  errorMessage:string = '';
  isLoading:boolean = false;

  loginForm:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_!@#$%^&*]{6,}$/)]),
  });

  handleForm():void{
    this.isLoading = true;
    const userData = this.loginForm.value;

    if(this.loginForm.valid){
      this._AuthService.login(userData).subscribe({
        next:(response) => {
          if(response.message == 'success'){
            localStorage.setItem('etoken', response.token);
            this._Router.navigate(['/home']);
          }
          this.isLoading = false;
        },
        error:(err) => {
          this.errorMessage = err.error.message;
          this.isLoading = false;
        }
      });
    }
  }
}
