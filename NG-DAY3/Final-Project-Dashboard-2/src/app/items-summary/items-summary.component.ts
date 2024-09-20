import { Component } from '@angular/core';

@Component({
    selector: 'app-items-summary',
    standalone: true,
    imports: [],
    templateUrl: './items-summary.component.html',
    styleUrl: './items-summary.component.css',
})
export class ItemsSummaryComponent {
    itemsSummaryData = [
        {
            name: "Chocolate Milkshake",
            quant: " 1",
            price: "150",
            total: "150"
        },
        {
            name: "Chocolate Milkshake",
            quant: " 2",
            price: "7.5",
            total: "15"
        },
        {
            name: "Finish Washer Large 3Kg",
            quant: " 3",
            price: "70",
            total: "210"
        }
    ]
}
