import InternalCarousel from './carousel';
import CarouselItem from './carousel-item';

export type InternalCarouselType = typeof InternalCarousel & {
  Item: typeof CarouselItem;
};

export type { CarouselProps } from './interface';

const Carousel = InternalCarousel as InternalCarouselType;

Carousel.Item = CarouselItem;

export default Carousel;
