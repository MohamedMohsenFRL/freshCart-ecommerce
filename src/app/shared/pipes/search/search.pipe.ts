import { Pipe, PipeTransform } from '@angular/core';
import { products } from '../../../core/interfaces/products/products';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: products[], searchValue: string): products[] {
    return products.filter((product) => {
      return product.title.toLowerCase().includes(searchValue.toLowerCase());
    })
  }

}
