import { Component } from '@angular/core';
import { ProductsContainerComponent } from "../products-container/products-container.component";

@Component({
  selector: 'app-products',
  imports: [ProductsContainerComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {


}
