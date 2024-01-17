import './style.css';
import './styles/carousel.css';
import carouselTemplate from "./templates/carousel.html?raw";
import Carousel, {CarouselControl, CarouselNext, CarouselPrevious} from "./components/carousel.ts";

import {dom, library} from '@fortawesome/fontawesome-svg-core';
import {faChevronLeft, faChevronRight, faPause, faPlay} from '@fortawesome/free-solid-svg-icons';

// carousel
library.add(faPause);
library.add(faPlay);
library.add(faChevronLeft);
library.add(faChevronRight);

dom.watch();

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    ${carouselTemplate}
`;

customElements.define("my-carousel", Carousel, {extends: "div"});
customElements.define('carousel-control', CarouselControl, {extends: 'button'});
customElements.define('carousel-previous', CarouselPrevious, {extends: 'button'});
customElements.define('carousel-next', CarouselNext, {extends: 'button'});
