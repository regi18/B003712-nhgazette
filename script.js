const {createApp} = Vue

createApp({
    data() {
        return {
            isMobileMenuOpen: false,
            isMobileSecondMenuOpen: false,
            isDisclaimerOpen: true,
            activeCarouselIndex: 0,
            currentSize: null,
            swipeOffset: 0,
            baseSwipeOffset: 0,
            isSwiping: false,
            // MAX 4 ARTICLES
            articles: [
                {
                    title: 'Justice Deferred? Or Defunct?',
                    description: 'March 10, 2023 | The Fortnightly Rant',
                    imgUrl: 'https://www.nhgazette.com/wp-content/uploads/2023/03/Waiting-for-Garland-655x465.jpg',
                    p: 'Watching Vladimir and Estragon on a nearly bare stage as they wait for Godot can, paradoxically, be a thrilling experience. Waiting for Merrick Garland to slap the cuffs on The Former Guy, on the other hand, is beginning to get tedious. Talk about pent-up demand. If Ticketmaster could sell seats to a DJT Perp Walk, its ensuing collapse would make last year’s Taylor Swift fiasco look like business as usual. And yet, we wait…and wait…. What—a seething nation might ask, boiling over in exasperation, had…',
                },
                {
                    title: 'A Brief Dispatch Regarding the Impending Coronation',
                    description: 'March 10, 2023 | The Alleged News®',
                    imgUrl: 'https://www.nhgazette.com/wp-content/uploads/2023/03/Black-History-275x202.jpg',
                    p: 'The U.S. and the U.K., said George Bernard Shaw, are two nations separated by a common language. Further distinguishing us from our former colonial master is our form of government—though GOP opposition to monarchy seems increasingly squishy. Our editorial position on monarchy was most recently published on February 10th, with a selection from Thomas Paine’s, Common Sense; herewith, a more succinct version: Britain’s first king was “nothing better than the principal ruffian of some restless…',
                },
                {
                    title: 'Snowflake Culture',
                    description: 'February 11, 2023 | The Northcountry Chronicle',
                    p: 'by W.D. Ehrhart I have been writing poetry ever since I was 15 years old. My first published work appeared in 1971 when I was 22 years old. Since then, I’ve published over 400 poems. Along the way, I’ve probably received as many as 4,000…',
                },
                {
                    title: 'Merrimack Station: A Fifty Year N.H. Disaster Continues',
                    description: 'February 11, 2023 | Mash Notes, Hate Mail & Other Correspondence',
                    p: 'by Roy Morrison Merrimack Station, the coal fired power plant on the banks of the Merrimack River in Bow, New Hampshire, has recently passed its fiftieth anniversary. It’s New England’s last remaining coal plant. It’s also N.H.’s largest point source of carbon pollution. The plant…',
                }
            ],
            carouselCards: [
                {
                    title: 'Mon, Apr 3',
                    p: '2014—Sen. Jerry Moran [R-Kan.], whose top contributor is Koch Industries, reads into the Congressional Record a Wall Street Journal op-ed in which Charles Koch defends his right to spend millions…'
                },
                {
                    title: 'Sun, Apr 2',
                    p: '2014—In McCutcheon v. FEC, the Supreme Court rules that rich folks deserve to have more influence in elections than the unwashed proletariat. 1982—U.S. Ambassador to the U.N. Jeanne Kirkpatrick dines…'
                },
                {
                    title: 'Sat, Apr 1',
                    p: '2013—In Portsmouth Harbor, the tanker Harbour Feature allides with the Sarah Mildred Long Bridge. 2004—Britain declassifies “Blue Peacock,” a 1957 plan to bury nukes in Germany with live chickens keeping…'
                },
                {
                    title: 'Fri, Mar 31',
                    p: '2016—Darcie Rae Hall, 36, of Troy, N.H., is arrested in Keene for selling “Donald Trump” brand heroin. 2004—Four American contractors are ambushed and killed in Fallujah, their bodies displayed from…'
                },
                {
                    title: 'Thurs, Mar 30',
                    p: '2016—School bus mechanics in Virginia discover plastic explosives inadvertently left behind by the CIA. 2008—As he throws out the first pitch at Washington’s new National Park, George W.[MD] Bush is…'
                },
                {
                    title: 'Wed, Mar 29',
                    p: '2003—Newsweek publishes a poll saying 74 percent of Americans believe that the Bush administration has “a well thought-out military plan.” 1995—Rep. Dan Burton [R-Ind.] says the U.S. “should place an…'
                },
                {
                    title: 'Tue, Mar 28',
                    p: '2013—In Portsmouth Harbor, the tanker Harbour Feature allides with the Sarah Mildred Long Bridge. 2004—Britain declassifies “Blue Peacock,” a 1957 plan to bury nukes in Germany with live chickens keeping…'
                },
                {
                    title: 'Mon, Mar 27',
                    p: '2016—Darcie Rae Hall, 36, of Troy, N.H., is arrested in Keene for selling “Donald Trump” brand heroin. 2004—Four American contractors are ambushed and killed in Fallujah, their bodies displayed from…'
                },
                {
                    title: 'Sun, Mar 26',
                    p: '2016—School bus mechanics in Virginia discover plastic explosives inadvertently left behind by the CIA. 2008—As he throws out the first pitch at Washington’s new National Park, George W.[MD] Bush is…'
                },
                {
                    title: 'Sat, Mar 25',
                    p: '2003—Newsweek publishes a poll saying 74 percent of Americans believe that the Bush administration has “a well thought-out military plan.” 1995—Rep. Dan Burton [R-Ind.] says the U.S. “should place an…'
                },
            ],
        }
    },
    created() {
        this.isDisclaimerOpen = window.localStorage.getItem('isShowDisclaimer') === null;
    },
    mounted() {
        this.setScreenSize();
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener("resize", this.setScreenSize);
    },
    methods: {
        setScreenSize() {
            this.currentSize = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
        },
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
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        },
        getStyle(i) {
            const p = ((i + (this.activeCarouselIndex * -this.carouselCardsPerSlide)) * 100);

            return `transform: translateX(calc(${p}% + ${this.swipeOffset}px));`;
        },
        initSwipe() {
            const el = this.$refs.carousel;

            el.addEventListener('mousedown', this.handleMouseDown, true);
            document.addEventListener('mouseup', this.handleMouseUp, true);
            document.addEventListener('mousemove', this.handleMouseMove, true);

            el.addEventListener('touchstart', (e) => this.handleMouseDown(e, true), true);
            document.addEventListener('touchend', this.handleMouseUp, true);
            document.addEventListener('touchcancel', this.handleMouseUp, true);
            document.addEventListener('touchmove', (e) => this.handleMouseMove(e, true), true);
        },
        handleMouseDown(e, isTouch = false) {
            const el = this.$refs.carousel;
            this.isSwiping = true;
            el.classList.add('no-transition');

            if (isTouch) this.baseSwipeOffset = el.offsetLeft - e.touches[0].clientX;
            else this.baseSwipeOffset = el.offsetLeft - e.clientX;
        },
        handleMouseUp() {
            const el = this.$refs.carousel;
            this.isSwiping = false;
            el.classList.remove('no-transition');

            const limit = 180;

            if (this.swipeOffset > limit) this.resetSwipe(-1);
            else if (this.swipeOffset < -limit) this.resetSwipe(1);
            else if (this.swipeOffset < limit) this.resetSwipe(0);
            else if (this.swipeOffset > -limit) this.resetSwipe(0);
        },
        handleMouseMove(event, isTouch = false) {
            if (this.isSwiping) {
                let o;
                if (isTouch) {
                    o = event.touches[0].clientX + this.baseSwipeOffset;
                } else {
                    event.preventDefault();
                    o = event.clientX + this.baseSwipeOffset;
                }

                if (this.activeCarouselIndex === 0 && o > 0) return;
                if (this.activeCarouselIndex === this.numOfDots - 1 && o < 0) return;

                this.swipeOffset = o;
            }
        },
        resetSwipe(addToCarouselIndex = 0) {
            this.baseSwipeOffset = 0;
            this.isSwiping = false;
            this.swipeOffset = 0;
            this.activeCarouselIndex += addToCarouselIndex;
        }
    },
    computed: {
        numOfDots() {
            return Math.ceil(this.carouselCards.length / this.carouselCardsPerSlide);
        },
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
                this.$nextTick(() => {
                    this.initSwipe();
                })

                window.localStorage.setItem('isShowDisclaimer', this.isDisclaimerOpen);
            }
        }
    }
}).mount('#app')
