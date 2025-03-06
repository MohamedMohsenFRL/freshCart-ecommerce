import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isLoading: boolean = false;
  errorMsg: string = '';

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z]\w{6,}$/),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0152][0-9]{8}$/),
      ]),
    },
    { validators: [this.passwordMatch] }
  );

  passwordMatch(form: AbstractControl) {
    let password = form.get('password')?.value;
    let rePassword = form.get('rePassword')?.value;
    if (password === rePassword) {
      return null;
    } else {
      return { missMatch: true };
    }
  }

  onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.isLoading = true;
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.message == 'success') {
            this.router.navigate(['/login']);
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
