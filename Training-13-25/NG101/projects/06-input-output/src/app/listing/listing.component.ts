import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car } from '../car';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [CommonModule],
  template: ` <!-- listing markup goes here -->
    <article class="listing">
        <div class="image-parent">
          <img class="product-image" src="https://placehold.co/100x100" />
        </div>
        <section class="details">
          <p class="title">{{car.make}} {{car.model}}</p>
          <hr />
          <p class="detail">
            <span>Year</span>
            <span>{{car.year}}</span>
          </p>
          <div class="detail">
            <span>Transmission</span>
            <span>{{car.transmission}}</span>
          </div>
          <p class="detail">
            <span>Mileage</span>
            <span>{{car.miles}}</span>
          </p>
          <p class="detail">
            <span>Price</span>
            <span>{{car.price}}</span>
          </p>
          <button (click)="handleCarSaved()">Save Car</button>
        </section>
      </article>
  `,
  styles: ``,
})
export class ListingComponent {
  @Input() car!: Car;
  @Output() carSaved = new EventEmitter<Car>();

  handleCarSaved() {
    this.carSaved.emit(this.car)
  }
}
