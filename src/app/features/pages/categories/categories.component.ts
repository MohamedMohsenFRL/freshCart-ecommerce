import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { Categories } from '../../../core/interfaces/categories/categories';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
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
}
