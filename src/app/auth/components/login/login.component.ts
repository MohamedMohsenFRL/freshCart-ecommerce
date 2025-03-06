import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isLoading: boolean = false;
  errorMsg: string = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.message == 'success') {
            localStorage.setItem('token', res.token);
            this.authService.tokenDecode();
            this.router.navigate(['/home']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.errorMsg = err.error.message;
        },
      });
    }
  }
}
