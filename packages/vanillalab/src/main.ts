import './style.css';
import './styles/carousel.css';
import badCarouselTemplate from "./templates/bad_carousel.html?raw";
import carouselTemplate from "./templates/carousel.html?raw";
import Carousel, {CarouselControl, CarouselNext, CarouselPrevious} from "./components/carousel.ts";
import BadCarousel, {BadCarouselControl, BadCarouselNext, BadCarouselPrevious} from "./components/badCarousel.ts";

import {dom, library} from '@fortawesome/fontawesome-svg-core';
import {faChevronLeft, faChevronRight, faPause, faPlay} from '@fortawesome/free-solid-svg-icons';

// carousel
library.add(faPause);
library.add(faPlay);
library.add(faChevronLeft);
library.add(faChevronRight);

dom.watch();

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <section aria-labelledby="bad-carousel" class="mb-8 max-w-screen-lg mx-auto">
        <h2 id="bad-carousel" class="text-2xl font-semibold mb-4">Bad carousel</h2>
        ${badCarouselTemplate}
    </section>
    <section aria-labelledby="good-carousel" class="mb-8 max-w-screen-lg mx-auto">
        <h2 id="good-carousel" class="text-2xl font-semibold mb-4">Good carousel</h2>
        ${carouselTemplate}
    </section>
`;

setTimeout(() => {

}, 1000)

customElements.define("my-carousel", Carousel, {extends: "div"});
customElements.define('carousel-control', CarouselControl, {extends: 'button'});
customElements.define('carousel-previous', CarouselPrevious, {extends: 'button'});
customElements.define('carousel-next', CarouselNext, {extends: 'button'});

// bad carousel implementation
customElements.define("bad-carousel", BadCarousel, {extends: "div"});
customElements.define('bad-control', BadCarouselControl, {extends: 'button'});
customElements.define('bad-previous', BadCarouselPrevious, {extends: 'button'});
customElements.define('bad-next', BadCarouselNext, {extends: 'button'});
