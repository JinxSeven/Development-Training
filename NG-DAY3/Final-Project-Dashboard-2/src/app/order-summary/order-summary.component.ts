import { Component } from '@angular/core';

@Component({
    selector: 'app-order-summary',
    standalone: true,
    imports: [],
    templateUrl: './order-summary.component.html',
    styleUrl: './order-summary.component.css',
})
export class OrderSummaryComponent {
    orderSummaryDetails = [
        { lhs: "Order Created", rhs: "Sun, May 7, 2021" },
        { lhs: "Order Time", rhs: "06:24 AM" },
        { lhs: "Subtotal", rhs: "£375.00" },
        { lhs: "Delivery Fee", rhs: "£0.00" }
    ]
}
