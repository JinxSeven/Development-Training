import { Component } from '@angular/core';
import { ItemsSummaryComponent } from '../items-summary/items-summary.component';
import { CxOrdDtlsComponent } from '../cx-ord-dtls/cx-ord-dtls.component';
import { RiderDtlsComponent } from '../rider-dtls/rider-dtls.component';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';

@Component({
    selector: 'app-main-content',
    standalone: true,
    imports: [
        ItemsSummaryComponent,
        CxOrdDtlsComponent,
        RiderDtlsComponent,
        OrderSummaryComponent
    ],
    templateUrl: './main-content.component.html',
    styleUrl: './main-content.component.css',
})
export class MainContentComponent {}
