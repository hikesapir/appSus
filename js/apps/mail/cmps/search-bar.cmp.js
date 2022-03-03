'use strict';

export default {
    name: 'search-bar',
    props: [],
    template: `
        <section class="search-bar">
            <input type="search">
            <select @change="filter" v-model="filterBy" >
            <option value="all">All</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
        </select>
            <i class="fa-solid fa-calendar-minus"></i>        
            <i class="fa-solid fa-calendar-plus"></i>   
        </section>
    `,
    components: {
    },
    data() {
        return {
            filterBy: 'all'
        }
    },
    created() {

    },

    methods: {
        filter() {
            console.log('filter by ', this.filterBy);
            this.$emit('filter', this.filterBy)
        }

    },
    computed: {

    },
}