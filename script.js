const {createApp} = Vue

createApp({
    data() {
        return {
            isMobileMenuOpen: false,
            isMobileSecondMenuOpen: false,
            isDisclaimerOpen: true,
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
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
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
        }
    },
}).mount('#app')
