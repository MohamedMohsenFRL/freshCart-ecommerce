import { Component, computed, OnInit, Signal } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { products } from '../../../core/interfaces/products/products';
import { CurrencyPipe } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Meta, Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { Wishedlist } from '../../../core/interfaces/wishlist/wish-list';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  id: any;
  productDetails!: products;
  wishedList:Signal<string[]> = computed(()=> this.wishlistService.wishedId())

  constructor(
    private productsService: ProductsService,
    activatedRoute: ActivatedRoute,
    private title: Title,
    private meta: Meta,
    private cartService: CartService,
    private toastr: ToastrService,
    private wishlistService: WishlistService
  ) {
    activatedRoute.params.subscribe((res) => {
      this.id = res['id'];
    });
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.productsService.getSpecificProduct(this.id).subscribe({
      next: (res) => {
        this.productDetails = res.data;
        this.title.setTitle(`FreshCart - ${this.productDetails.title}`);
        this.meta.addTag({
          name: 'description',
          content: `${this.productDetails.description}`,
        });
      },
    });
  }

  ngOnDestroy() {
    const descriptionTag = this.meta.getTag('name="description"');
    if (descriptionTag) {
      this.meta.removeTagElement(descriptionTag);
    }
  }

  addProduct(id: string) {
    this.cartService.addToCart(id).subscribe({
      next: (res) => {
        this.toastr.success(res.message, '', {
          progressAnimation: 'increasing',
          progressBar: true,
        });
        this.cartService.counter.set(res.numOfCartItems)
      },
    });
  }

  addToWishlist(id: string) {
    this.wishlistService.addToWishlist(id).subscribe({
      next: (res) => {
        this.wishlistService.wishedId.set(res.data);
        localStorage.setItem('wishlist', JSON.stringify(res.data));
        this.toastr.success(res.message, '', {
          progressAnimation: 'increasing',
          progressBar: true,
        });
      }
    })
  }

  checkWished(id: string) {
    return this.wishedList().includes(id);
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayTimeout: 4000,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
  };
}
