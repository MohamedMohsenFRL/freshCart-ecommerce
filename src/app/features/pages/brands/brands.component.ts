import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../../core/services/brands/brands.service';
import { Brands } from '../../../core/interfaces/brands/brands';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  constructor(private brandsService: BrandsService) {}

  brandsList!: Brands;

  ngOnInit(): void {
    this.showBrands();
  }

  showBrands() {
    this.brandsService.getBrands().subscribe({
      next: (res) => {
        this.brandsList = res;
      },
    });
  }
}
