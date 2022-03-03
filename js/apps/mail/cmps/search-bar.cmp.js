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
            <i @click="sort('date',1)" class="fa-solid fa-calendar-minus"></i>        
            <i @click="sort('date',-1)" class="fa-solid fa-calendar-plus"></i>   
            <i @click="sort('subject',1)" class="fa-solid fa-arrow-down-a-z"></i>
            <i @click="sort('subject',-1)" class="fa-solid fa-arrow-up-z-a"></i>
        </section>
    `,
    components: {
    },
    data() {
        return {
            filterBy: 'all',

        }
    },
    created() {

    },

    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        },
        sort(sortBy, mult) {

            // console.log('sort by ', str, num);
            this.$emit('sort', sortBy, mult)
        }

    },
    computed: {

    },
}