import { Component } from '@angular/core';

@Component({
    selector: 'app-cx-ord-dtls',
    standalone: true,
    imports: [],
    templateUrl: './cx-ord-dtls.component.html',
    styleUrl: './cx-ord-dtls.component.css',
})
export class CxOrdDtlsComponent {
    cxOrdDetails = [
        {
            rhs: "Customer Name",
            lhs: "Harun Lbili"
        },
        {
            rhs: "Phone Number",
            lhs: "7918881829"
        },
        {
            rhs: "Bag Option",
            lhs: "No Bag"
        },
        {
            rhs: "Type",
            lhs: "Delivery"
        },
        {
            rhs: "Note",
            lhs: "N/A"
        },
    ]
}
