'use strict';

export default {
    name: 'long-text',
    props: ['txt'],
    template: `
        <p>{{description}}<span v-if="isReadMore">{{fullDescription}}</span>
         <span @click="changeIsRaedMore" class="read-more">{{readMore}}</span>
        </p>
     `,

    data() {
        return {
            isReadMore: false,
        }
    },

    methods: {
        changeIsRaedMore() {
            this.isReadMore = !this.isReadMore
        }
    },

    computed: {
        description() {
            return this.txt.slice(0, 80)
        },
        fullDescription() {
            return this.txt.slice(100)
        },
        readMore() {
            if (this.txt.length > 100) {
                return (this.isReadMore) ? '...Read less' : '...Read more'
            }
        }
    },
}