import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  steps: number = 1;
  errorMsg: string = '';
  isLoading: boolean = false;

  router = inject(Router)

  constructor(private authService: AuthService,private toastr: ToastrService) {}

  emailForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  submitEmail() {
    if (this.emailForm.valid) {
      this.isLoading = true;
      this.authService.forgetPassword(this.emailForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.steps = 2;
          this.errorMsg = '';
          this.toastr.success(res.message , 'Success' , {
            progressAnimation: 'increasing',
            progressBar: true
          });
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.errorMsg = err.error.message;
        },
      });
    } else {
      this.emailForm.markAllAsTouched();
    }
  }

  codeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6}$/),
    ]),
  });

  submitCode() {
    if (this.codeForm.valid) {
      this.isLoading = true;
      this.authService.verifyCode(this.codeForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.steps = 3;
          this.errorMsg = '';
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.errorMsg = err.error.message;
        },
      });
    } else {
      this.codeForm.markAllAsTouched();
    }
  }

  resetForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{6,}$/),
    ]),
  });

  submitReset() {
    if (this.resetForm.valid) {
      this.isLoading = true;
      this.authService.resetPassword(this.resetForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.errorMsg = '';
          if(res.token) {
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
    } else {
      this.resetForm.markAllAsTouched();
    }
  }
}
