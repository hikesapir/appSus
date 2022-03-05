export default {
    template: `
        <section class="book-filter flex">
            <div class="filter" >
                <input class="search" type="text" v-model="filterBy.byName" placeholder="Search By Name">
                <input  @input="setFliter" type="range" v-model.number="filterBy.toPrice" min="0" max="1000" :title="filterBy.toPrice">
                <span>{{showVal}}</span>
                <div class="btn-container">
                    <button @click="setFilter" title="Filter">Filter</button>
                    <button @click="onClear" title="Clear">Clear</button>
                </div>
            </div>
            
            <router-link title="Add a new book!" to="/book/add"><i class="fa-solid fa-plus"></i></router-link>
        </section>
    `,
    data() {
        return {
            filterBy: {
                byName: '',
                fromPrice: 0,
                toPrice: 1000
            }
        };
    },
    methods: {
        setFilter() {
            this.$emit('filtered', { ...this.filterBy });
        },
        onClear() {
            this.filterBy.byName = ''
            this.filterBy.fromPrice = 0
            this.filterBy.toPrice = 1000
            this.$emit('clear', this.filterBy);
        }
    },
    computed: {
        showVal(){
            return this.filterBy.toPrice
        }
    },

}