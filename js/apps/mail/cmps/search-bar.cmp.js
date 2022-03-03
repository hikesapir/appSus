'use strict';

export default {
    name: 'search-bar',
    props: [],
    template: `
        <section class="search-bar">
        <label for="search"><i class="fa-solid fa-magnifying-glass"></i></label>
            <input class="search" type="search" id="search" v-model="inputSearch" @input="filter" placeholder="Search in mail">
            <select @change="filter" v-model="filterBy" >
            <option value="all">All</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
        </select>
            <i v-if="isDate"   @click="sort('date',1), isDate=!isDate " class="fa-solid fa-calendar-minus"></i>        
            <i v-if="!isDate" @click="sort('date',-1), isDate=!isDate " class="fa-solid fa-calendar-plus"></i>   
            <i v-if="isAZ" @click="sort('subject',1), isAZ=!isAZ" class="fa-solid fa-arrow-down-a-z"></i>
            <i v-if="!isAZ" @click="sort('subject',-1), isAZ=!isAZ" class="fa-solid fa-arrow-up-z-a"></i>
        </section>
    `,
    components: {
    },
    data() {
        return {
            filterBy: 'all',
            inputSearch: '',
            isAZ: true,
            isDate: true


        }
    },
    created() {

    },

    methods: {
        filter() {

            this.$emit('filter', this.filterBy, this.inputSearch)
        },
        sort(sortBy, mult) {
            this.$emit('sort', sortBy, mult)
        }

    },
    computed: {

    },
}