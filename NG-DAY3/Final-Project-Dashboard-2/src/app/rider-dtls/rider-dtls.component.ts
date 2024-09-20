import { Component } from '@angular/core';

@Component({
    selector: 'app-rider-dtls',
    standalone: true,
    imports: [],
    templateUrl: './rider-dtls.component.html',
    styleUrl: './rider-dtls.component.css',
})
export class RiderDtlsComponent {
    riderInformation = [
        {
            name: "Robart Suvent",
            imageSrc: "images/rider.png"
        }
    ]
}
