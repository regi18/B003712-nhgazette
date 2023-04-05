const {createApp} = Vue

createApp({
    data() {
        return {
            isMobileMenuOpen: false,
            isMobileSecondMenuOpen: false,
            isDisclaimerOpen: false,
            activeCarouselIndex: 0,
            currentSize: null,
            swipeOffset: 0,
            baseSwipeOffset: 0,
            isSwiping: false,
            articles: [],
            carouselCards: [],
        }
    },
    created() {
        // Set disclaimer status
        this.isDisclaimerOpen = window.localStorage.getItem('isShowDisclaimer') === null;

        // Fetch articles (only last 4)
        fetch('./resources/articles.json').then((response) => response.json()).then(e => this.articles = e.slice(0, 4));
        // Fetch carousel cards
        fetch('./resources/carouselCards.json').then((response) => response.json()).then(e => {
            this.carouselCards = e;
            this.initSwipe();
        });
    },
    mounted() {
        this.setScreenSize();
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener("resize", this.setScreenSize);
    },
    methods: {
        // Set a variable on body:before that signals the screen size
        setScreenSize() {
            this.currentSize = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/"/g, '');
        },
        // Show/Hide the "scroll to top" button
        handleScroll() {
            const minScroll = 280;
            const btn = this.$refs.scrollToTopBtn;
            if (document.body.scrollTop > minScroll || document.documentElement.scrollTop > minScroll) {
                btn.classList.add('show');
            }
            else {
                btn.classList.remove('show');
            }
        },
        // Scroll to top
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        },
        // Style for a carousel card (x translation)
        getStyle(i) {
            const p = ((i + (this.activeCarouselIndex * -this.carouselCardsPerSlide)) * 100);

            return `transform: translateX(calc(${p}% + ${this.swipeOffset}px));`;
        },
        // Init the events needed by the carousel for swipe gestures
        async initSwipe() {
            await this.$nextTick();

            this.$refs.carousel.childNodes.forEach((child) => {
                child.addEventListener('mousedown', this.handleMouseDown, true);
                child.addEventListener('touchstart', (e) => this.handleMouseDown(e, true), true);
            });

            document.addEventListener('mouseup', this.handleMouseUp, true);
            document.addEventListener('mousemove', this.handleMouseMove, true);

            document.addEventListener('touchend', this.handleMouseUp, true);
            document.addEventListener('touchcancel', this.handleMouseUp, true);
            document.addEventListener('touchmove', (e) => this.handleMouseMove(e, true), {passive: false});
        },
        // Set starting point of swipe gesture
        handleMouseDown(e, isTouch = false) {
            this.isSwiping = true;
            this.$refs.carousel.classList.add('no-transition');

            if (isTouch) this.baseSwipeOffset = e.target.offsetLeft - e.touches[0].clientX;
            else this.baseSwipeOffset = e.target.offsetLeft - e.clientX;
        },
        // Handle end of swipe gesture
        handleMouseUp() {
            this.isSwiping = false;
            // Remove transition for smooth swiping
            this.$refs.carousel.classList.remove('no-transition');

            // The minimum that you have to swipe to change slide
            const limit = 150;

            // Check if the swipe was enough to change slide
            if (this.swipeOffset > limit) this.resetSwipe(-1);
            else if (this.swipeOffset < -limit) this.resetSwipe(1);
            // Otherwise reset the values (this achieves the "snap back"\"bounce" effect)
            else if (this.swipeOffset < limit) this.resetSwipe(0);
            else if (this.swipeOffset > -limit) this.resetSwipe(0);
        },
        // Track mouse/finger movement during swipe gesture
        handleMouseMove(event, isTouch = false) {
            if (this.isSwiping) {
                // Prevent scroll while swiping in the carousel
                event.preventDefault();
                // Get mouse/finger position
                let o;
                if (isTouch) {
                    o = event.touches[0].clientX + this.baseSwipeOffset;
                }
                else {
                    o = event.clientX + this.baseSwipeOffset;
                }

                // Disable swipe if swiping left at first slide or swiping right at last slide
                if (this.activeCarouselIndex === 0 && o > 0) return;
                if (this.activeCarouselIndex === this.numOfDots - 1 && o < 0) return;

                this.swipeOffset = o;
            }
        },
        // Reset swiping values
        resetSwipe(addToCarouselIndex = 0) {
            this.baseSwipeOffset = 0;
            this.isSwiping = false;
            this.swipeOffset = 0;
            this.activeCarouselIndex += addToCarouselIndex;
        },
        openSubMenu() {
            this.$refs.topNavSubMenu.classList.toggle('is-open');
            this.$refs.topNavSubMenuArrow.classList.toggle('fa-angle-down');
            this.$refs.topNavSubMenuArrow.classList.toggle('fa-angle-up');
        }
    },
    computed: {
        // Number of slides in the carousel
        numOfDots() {
            return Math.ceil(this.carouselCards.length / this.carouselCardsPerSlide);
        },
        // Make the carousel responsive
        carouselCardsPerSlide() {
            if (this.currentSize === 'desktop') return 3;
            else if (this.currentSize === 'tablet') return 2;
            else if (this.currentSize === 'mobile') return 1;
            else return 3;
        }
    },
    watch: {
        isDisclaimerOpen() {
            if (!this.isDisclaimerOpen) {
                this.initSwipe();
                window.localStorage.setItem('isShowDisclaimer', this.isDisclaimerOpen);
            }
        }
    }
}).mount('#app')
