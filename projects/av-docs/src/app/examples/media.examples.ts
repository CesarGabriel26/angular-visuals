import { Component } from '@angular/core';
import { AvCarousel, AvCarouselItem } from 'angular-visuals';

const carouselStyles = `
  .carousel-demo {
    width: min(100%, 34rem);
    height: 14rem;
  }

  .slide {
    display: grid;
    height: 14rem;
    place-items: center;
    color: white;
    font-size: 1.25rem;
    font-weight: 800;
  }

  .slide--one {
    background: linear-gradient(135deg, var(--av-orange-500), var(--av-red-500));
  }

  .slide--two {
    background: linear-gradient(135deg, var(--av-blue-500), var(--av-purple-500));
  }

  .slide--three {
    background: linear-gradient(135deg, var(--av-green-500), var(--av-blue-500));
  }
`;

@Component({
  standalone: true,
  imports: [AvCarousel, AvCarouselItem],
  styles: [carouselStyles],
  template: `
    <av-carousel class="carousel-demo" [auto]="false">
      <av-carousel-item>
        <div class="slide slide--one">Slide 1</div>
      </av-carousel-item>

      <av-carousel-item>
        <div class="slide slide--two">Slide 2</div>
      </av-carousel-item>

      <av-carousel-item>
        <div class="slide slide--three">Slide 3</div>
      </av-carousel-item>
    </av-carousel>
  `,
})
export class CarouselBasicExample {}

@Component({
  standalone: true,
  imports: [AvCarousel, AvCarouselItem],
  styles: [carouselStyles],
  template: `
    <av-carousel class="carousel-demo" transition="scroll" [auto]="false">
      <av-carousel-item [duration]="3000">
        <div class="slide slide--one">Item com duracao</div>
      </av-carousel-item>

      <av-carousel-item>
        <div class="slide slide--two">Item padrao</div>
      </av-carousel-item>
    </av-carousel>
  `,
})
export class CarouselItemBasicExample {}
