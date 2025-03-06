import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { cart } from '../../../core/interfaces/cart/cart';
import { CartService } from '../../../core/services/cart/cart.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService,private toastr:ToastrService) {}

  cartItems!: cart;

  ngOnInit(): void {
    this.getCartItems()
  }

  getCartItems() {
    this.cartService.getFromCart().subscribe({
      next: (res) => {
        this.cartItems = res;
      },
    });
  }

  updateQuantity(id: string, quantity: number) {
    this.cartService.updateCart(id, quantity).subscribe({
      next: (res) => {
        this.cartItems = res
        this.cartService.counter.set(res.numOfCartItems)
      }
    })
  }

  clearCart() {
    this.cartService.removeAllProduct().subscribe({
      next: (res) => {
        this.getCartItems();
        this.cartService.counter.set(0)
      }
    })
  }

  removeSpecificProduct(id: string) {
    this.cartService.removeSpecificProduct(id).subscribe({
      next: (res) => {
        this.cartItems = res
        this.cartService.counter.set(res.numOfCartItems)
      }
    })
  }
}
