import "../styles/carousel.css";
class BadCarousel extends HTMLDivElement {
    slides: Array<HTMLDivElement>;
    activeSlide: HTMLDivElement;
    autoplay?: NodeJS.Timeout;
    slideWrapper: ParentNode;

    constructor() {
        super();
        this.slides = Array.from(this.querySelectorAll('.carousel_slide'));
        const sliderWrapper = this.slides[0].parentNode;

        if (sliderWrapper)
            this.slideWrapper = sliderWrapper;
        else
            throw new Error(`${this}: no parent element.`);

        this.activeSlide = this.slides[0];
        this.activeSlide.classList.add("carousel_slide--active");

        // start autoplay
        this.autoplay = setInterval(() => {
            this.nextSlide();
        }, 4000);

        this.shadowBuilder(this);
    }

    shadowBuilder(_root: HTMLElement) {
        this.startAutoplay();
    }

    nextSlide() {
        const currentIndex = this.slides.findIndex(el => el === this.activeSlide);
        let nextSlideIndex = Math.min(currentIndex + 1, this.slides.length - 1);

        if (nextSlideIndex === currentIndex)
            nextSlideIndex = 0;

        this.activeSlide = this.slides[nextSlideIndex];

        this.showActiveSlide();
        this.restartAutoplay();
    }

    previousSlide() {
        const nextSlideIndex = Math.max(this.slides.findIndex(el => el === this.activeSlide) - 1, 0);
        this.activeSlide = this.slides[nextSlideIndex];

        this.showActiveSlide();
        this.restartAutoplay();
    }

    showActiveSlide() {
        this.slides.forEach((slide) => {
            if (this.activeSlide && slide === this.activeSlide) {
                slide.classList.add('carousel_slide--active');
            } else {
                slide.classList.remove('carousel_slide--active');
            }
        });
    }

    startAutoplay() {
        if (!this.autoplay)
            this.autoplay = setInterval(() => {
                this.nextSlide();
            }, 4000);
    }

    restartAutoplay() {
        if(this.autoplay) {
            clearInterval(this.autoplay);
        }

        this.autoplay = setInterval(() => {
            this.nextSlide();
        }, 4000);
    }

    stopAutoplay() {
        if (this.autoplay) {
            clearInterval(this.autoplay)
            this.autoplay = undefined;
        }
    }

    handleRotation() {
        if (this.autoplay)
            this.stopAutoplay();
        else
            this.startAutoplay();

        return !!this.autoplay;
    }
}

class CarouselButton extends HTMLButtonElement {
    parentCarousel: BadCarousel;

    constructor() {
        super();
        const pc = this.closest<BadCarousel>('.carousel_wrapper');
        if (pc)
            this.parentCarousel = pc;
        else
            throw new Error(`${this}: no carousel parent element.`)

    }
}

export class BadCarouselControl extends CarouselButton {
    constructor() {
        super();

        if (!this.parentCarousel)
            throw new Error(`${this}: no carousel parent.`)

        const parentCarousel = this.parentCarousel;

        this.addEventListener('click', (_event) => {
            const play = this.parentCarousel.handleRotation();

            if (play) {
                this.innerHTML = '<span class="fa-solid fa-pause w-6 h-6"></span>';
                (parentCarousel.slideWrapper as HTMLElement).setAttribute('aria-live', 'off');
            } else {
                this.innerHTML = '<span class="fa-solid fa-play ml-1 w-6 h-6"></span>';
                (parentCarousel.slideWrapper as HTMLElement).setAttribute('aria-live', 'polite');
            }
        });
    }
}

export class BadCarouselPrevious extends CarouselButton {
    constructor() {
        super();

        this.addEventListener('click', (_event: MouseEvent) => {
            this.parentCarousel.previousSlide();
        });
    }
}

export class BadCarouselNext extends CarouselButton {
    constructor() {
        super();

        this.addEventListener('click', (_event: MouseEvent) => {
            this.parentCarousel.nextSlide();
        });
    }
}


export default BadCarousel;