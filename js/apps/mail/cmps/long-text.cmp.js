'use strict';

export default {
    name: 'long-text',
    props: ['txt'],
    template: `
        {{description}} {{readMore}}
        
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
            return this.txt.slice(0, 50)
        },
        // fullDescription() {
        //     return this.txt.slice(100)
        // },
        readMore() {
            if (this.txt.length > 50) {
                return '...'
            }
        }
    },
}