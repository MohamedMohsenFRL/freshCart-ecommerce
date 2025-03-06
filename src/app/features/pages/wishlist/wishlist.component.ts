import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import {
  Wishedlist,
  WishList,
} from '../../../core/interfaces/wishlist/wish-list';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  constructor(private wishtlistService: WishlistService) {}

  wishedList: Wishedlist[] = [];

  ngOnInit(): void {
    this.getWished()
  }

  getWished() {
    this.wishtlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishedList = res.data;
      },
    });
  }

  removeFromWishlist(id: string) {
    this.wishtlistService.removeFromWishlist(id).subscribe({
      next: (res) => {
        this.getWished();
        this.wishtlistService.wishedId.set(res.data);
        localStorage.setItem('wishlist', JSON.stringify(res.data));
      },
    });
  }
}
