import { Component, computed, inject, Input, OnInit, PLATFORM_ID, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from './../../services/flowbite/flowbite.service';
import { AuthService } from '../../../auth/services/auth.service';
import { CartService } from '../../services/cart/cart.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  counter:Signal<number> = computed(() => this.cart.counter());
  constructor(private FlowbiteService: FlowbiteService, public authService:AuthService,private cart:CartService) {}

  id = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.FlowbiteService.loadFlowbite(flowbite => {
      console.log('Flowbite loaded', flowbite);
    });

    if(isPlatformBrowser(this.id)) {
      this.cart.getFromCart().subscribe({
        next: (res) => {
          this.cart.counter.set(res.numOfCartItems)
        }
      })
    }

    this.authService.userData.subscribe({
      next: (res) => {
        if(res !== null) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      }
    })
  }

}
