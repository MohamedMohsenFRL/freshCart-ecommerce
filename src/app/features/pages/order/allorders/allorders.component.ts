import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../../core/services/order/order.service';
import { Order } from '../../../../core/interfaces/allorders/allorders';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe,DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent implements OnInit {
  order = inject(OrderService);

  allOrders!: Order[];

  ngOnInit(): void {
    this.displayOrders();
  }

  displayOrders() {
    if (typeof localStorage !== 'undefined') {
      const id = localStorage.getItem('userId')!;
      this.order.getOrder(id).subscribe({
        next: (res) => {
          this.allOrders = res;
        },
      });
    }
  }
}
