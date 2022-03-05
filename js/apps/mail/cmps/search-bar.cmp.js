'use strict';

export default {
    name: 'search-bar',
    props: [],
    template: `
        <section class="search-bar">
        <div>
          <p @click="openNavBar" ><i class="fa-solid fa-bars"></i></p>
          </div> 
          <div class="flex" >
                <p><label for="search" title="Search"  ><i class="fa-solid fa-magnifying-glass"></i></label></p> 
                <input class="search" type="search" id="search" v-model="inputSearch" @input="filter" placeholder="Search in mail">
                <select class="select" @change="filter" v-model="filterBy" title="Filter" >
                    <option value="all">All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                </select>
            </div>
            <div class="flex">
                <p title="Newer first"> <i v-if="isDate" :class="{ pink: clicked === 'date'}"  @click="sort('date',-1), isDate=!isDate " class="fa-solid fa-calendar-minus"></i>   </p>     
                <p title="Older first"> <i v-if="!isDate" :class="{ pink: clicked === 'date'}" @click="sort('date',1), isDate=!isDate " class="fa-solid fa-calendar-plus"></i>   </p>
                <p title="Z-A"><i v-if="!isAZ" :class="{ pink: clicked === 'from'}" @click="sort('from',-1), isAZ=!isAZ" class="fa-solid fa-arrow-down-a-z"></i></p>
                <p title="A-Z"> <i v-if="isAZ" :class="{ pink: clicked === 'from'}" @click="sort('from',1), isAZ=!isAZ" class="fa-solid fa-arrow-up-z-a"></i></p>
            </div>
        
        </section>
    `,
    components: {
    },
    data() {
        return {
            filterBy: 'all',
            inputSearch: '',
            isAZ: true,
            isDate: true,
            clicked:'date',
        }
    },
    created() {

    },

    methods: {
        filter() {
            this.$emit('filter', this.filterBy, this.inputSearch)
        },
        sort(sortBy, mult) {
            this.clicked = sortBy
            this.$emit('sort', sortBy, mult)
        },
        openNavBar(){
            this.$emit('openNavBar')
        }

    },
    computed: {

    },
}