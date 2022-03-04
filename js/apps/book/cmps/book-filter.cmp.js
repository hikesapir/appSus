export default {
    template: `
        <section class="book-filter">
            <form @submit.prevent="setFilter">
            <label>
            Search By Name
            <input type="text" v-model="filterBy.byName">
            </label>
            <label>
            From Price
            <input type="number" v-model="filterBy.fromPrice">
            </label>
            <label>
            To Price
            <input type="number" v-model="filterBy.toPrice">
            </label>
            <button>Filter</button>
        </form>
        <button @click="onClear">Clear</button>
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
            this.$emit('filtered', {...this.filterBy});
        },
        onClear() {
            this.filterBy.byName = ''
            this.filterBy.fromPrice = 0
            this.filterBy.toPrice = 1000
            this.$emit('clear', this.filterBy);
        }
    }
}