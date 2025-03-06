import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { Categories } from '../../../core/interfaces/categories/categories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-category-slider',
  imports: [CarouselModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss'
})
export class CategorySliderComponent implements OnInit {
  constructor(private categoriesService: CategoriesService) {}

  categoreisList!: Categories;

  ngOnInit(): void {
    this.showCategories();
  }

  showCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        this.categoreisList = res;
      },
    });
  }

    customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      autoplay: true,
      autoplayTimeout: 4000,
      dots: false,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 3
        },
        740: {
          items: 4
        },
        940: {
          items: 6
        }
      }
    }
}
