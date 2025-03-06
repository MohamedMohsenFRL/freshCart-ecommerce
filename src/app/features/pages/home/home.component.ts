import { Component } from '@angular/core';
import { MainSliderComponent } from "../main-slider/main-slider.component";
import { CategorySliderComponent } from "../category-slider/category-slider.component";
import { ProductsContainerComponent } from "../products-container/products-container.component";

@Component({
  selector: 'app-home',
  imports: [MainSliderComponent, CategorySliderComponent, ProductsContainerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
