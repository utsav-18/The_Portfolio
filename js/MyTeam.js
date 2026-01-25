// Team Carousel
const teamCarousel = {
    currentIndex: 0,
    cards: [],
    dots: [],

    init() {
        this.cards = document.querySelectorAll('.team-card');
        this.createDots();
        this.updateCarousel();
        this.attachEvents();
    },

    createDots() {
        const dotsContainer = document.getElementById('carouselDots');
        this.cards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
            this.dots.push(dot);
        });
    },

    updateCarousel() {
        this.cards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next');

            if (index === this.currentIndex) {
                card.classList.add('active');
            } else if (index === this.getPrevIndex()) {
                card.classList.add('prev');
            } else if (index === this.getNextIndex()) {
                card.classList.add('next');
            }
        });

        this.updateDots();
    },

    updateDots() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    },

    getPrevIndex() {
        return this.currentIndex === 0 ? this.cards.length - 1 : this.currentIndex - 1;
    },

    getNextIndex() {
        return this.currentIndex === this.cards.length - 1 ? 0 : this.currentIndex + 1;
    },

    next() {
        this.currentIndex = this.getNextIndex();
        this.updateCarousel();
    },

    prev() {
        this.currentIndex = this.getPrevIndex();
        this.updateCarousel();
    },

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    },

    attachEvents() {
        document.getElementById('nextBtn').addEventListener('click', () => this.next());
        document.getElementById('prevBtn').addEventListener('click', () => this.prev());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        const carouselWrapper = document.querySelector('.carousel-wrapper');
        
        carouselWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        carouselWrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });

        const handleSwipe = () => {
            if (touchEndX < touchStartX - 50) this.next();
            if (touchEndX > touchStartX + 50) this.prev();
        };

        this.handleSwipe = handleSwipe;
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    teamCarousel.init();
});