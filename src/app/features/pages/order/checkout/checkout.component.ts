import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../../core/services/order/order.service';
import { CartService } from '../../../../core/services/cart/cart.service';
@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  activateR = inject(ActivatedRoute);

  constructor(private order: OrderService, private router: Router,private cart:CartService) {}

  errorMsg: string = '';
  id!: string;
  paymentMethod: string = '';

  orderForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.activateR.paramMap.subscribe({
      next: (res) => {
        this.id = res.get('id')!;
      },
    });
  }

  onSubmit() {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
    } else {
      if(this.paymentMethod == 'cash'){
        this.cashCheckout();
      } else {
        this.cardCheckout();
      }
    }
  }

  cashCheckout() {
    this.order.cashCheckout(this.id, this.orderForm.value).subscribe({
      next: (res) => {
        this.router.navigate(['/allorders']);
        this.cart.counter.set(0)
      },
      error: (err: HttpErrorResponse) => {
        this.errorMsg = err.error.message;
      },
    });
  }

  cardCheckout() {
    this.order.cartCheckout(this.id, this.orderForm.value).subscribe({
      next: (res) => {
        open(res.session.url, '_self');
      },
      error: (err: HttpErrorResponse) => {
        this.errorMsg = err.error.message;
      },
    });
  }
}
