import { Component, computed, OnInit, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../../core/services/products/products.service';
import { CurrencyPipe } from '@angular/common';
import { allProducts } from '../../../core/interfaces/products/products';
import { SearchPipe } from '../../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { Wishedlist } from '../../../core/interfaces/wishlist/wish-list';

@Component({
  selector: 'app-products-container',
  imports: [RouterLink, CurrencyPipe, SearchPipe, FormsModule],
  templateUrl: './products-container.component.html',
  styleUrl: './products-container.component.scss',
})
export class ProductsContainerComponent implements OnInit {
  searchValue: string = '';
  wishedList: Signal<string[]> = computed(() =>
    this.wishlistService.wishedId()
  );
  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private toastr: ToastrService,
    private wishlistService: WishlistService
  ) {}

  productList!: allProducts;

  ngOnInit(): void {
    this.showProducts();
  }

  showProducts() {
    this.productsService.getProducts().subscribe({
      next: (res) => {
        this.productList = res;
      },
    });
  }

  addProduct(id: string) {
    this.cartService.addToCart(id).subscribe({
      next: (res) => {
        this.toastr.success(res.message, '', {
          progressAnimation: 'increasing',
          progressBar: true,
        });
        this.cartService.counter.set(res.numOfCartItems);
      },
    });
  }

  addToWishlist(id: string) {
    this.wishlistService.addToWishlist(id).subscribe({
      next: (res) => {
        this.wishlistService.wishedId.set(res.data);
        this.toastr.success(res.message, '', {
          progressAnimation: 'increasing',
          progressBar: true,
        });
        localStorage.setItem('wishlist', JSON.stringify(res.data));
      },
    });
  }

  checkWished(id: string) {
    return this.wishedList().includes(id);
  }
}
